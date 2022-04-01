import { GetStaticProps, NextPage } from 'next';

import Prismic from '@prismicio/client';
import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import { formatPostDate } from '../utils';

import styles from './home.module.scss';
import Header from '../components/Header';

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

const Home: NextPage<HomeProps> = props => {
  return (
    <>
      <img src="/images/logo.svg" alt="logo" />

      <h1>hellos</h1>
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
