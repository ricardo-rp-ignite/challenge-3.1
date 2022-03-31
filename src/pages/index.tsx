import { GetStaticProps, NextPage } from 'next';

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

const Home: NextPage<HomeProps> = props => {
  console.log(props);

  return <h1>hello</h1>;
};

export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
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

  const props: HomeProps = {
    postsPagination: {
      results: posts,
      next_page: 'null',
    },
  };

  return { props };
};
