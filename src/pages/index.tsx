import { GetStaticProps, NextPage } from 'next';

import Prismic from '@prismicio/client';
import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import { formatPostDate } from '../utils';

import { Post } from '../components/Post';

import Header from '../components/Header';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

const Home: NextPage<HomeProps> = ({ postsPagination: { results } }) => {
  return (
    <>
      <img src="/images/logo.svg" alt="logo" />

      {results.map(({ uid, first_publication_date, data }) => (
        <Post key={uid} date={first_publication_date} {...data} />
      ))}
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const prismic = getPrismicClient();

  const postsPagination = await prismic.query(
    Prismic.predicates.at('document.type', 'posts')
  );

  const props: HomeProps = { postsPagination };

  return { props };
};
