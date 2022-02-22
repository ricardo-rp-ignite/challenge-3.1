import { GetStaticProps } from 'next';

import Prismic from '@prismicio/client';
import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import { formatPostDate } from '../utils';

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

export default function Home() {
  return <h1>hello</h1>;
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const postsResponse = await prismic.query(
    Prismic.predicates.at('document.type', 'posts')
  );

  const posts = postsResponse.results.map(
    (post): Post => ({
      uid: post.uid,
      first_publication_date: formatPostDate(post.last_publication_date),
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    })
  );

  return { props: { posts } };
};
