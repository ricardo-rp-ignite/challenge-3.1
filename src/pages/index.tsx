import { GetStaticProps, NextPage } from 'next';

import Prismic from '@prismicio/client';
import { useState } from 'react';
import { getPrismicClient } from '../services/prismic';

import { PostLink } from '../components/PostLink';

import commonStyles from '../styles/common.module.scss';
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

const Home: NextPage<HomeProps> = ({
  postsPagination: { results, next_page },
}) => {
  const [nextPageUrl, setNextPageLink] = useState<string | null>(next_page);
  const [posts, setPosts] = useState<Post[]>(results);

  function fetchMorePosts(): void {
    if (nextPageUrl === null) return;

    fetch(nextPageUrl)
      .then(resp => resp.json())
      .then(data => {
        setNextPageLink(data.next_page);
        setPosts([...posts, ...data.results]);
      });
  }

  return (
    <main className={[commonStyles.container, styles.feed].join(' ')}>
      <img src="/images/logo.svg" alt="logo" />

      {posts.map(({ uid, first_publication_date: date, data }) => (
        <PostLink key={uid} {...{ date, uid, ...data }} />
      ))}

      {nextPageUrl !== null && (
        <button
          className={styles.loadMore}
          type="button"
          onClick={fetchMorePosts}
        >
          Carregar mais posts
        </button>
      )}
    </main>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const prismic = getPrismicClient();

  const postsPagination = await prismic.query(
    Prismic.predicates.at('document.type', 'posts'),
    { pageSize: 2 }
  );

  const props: HomeProps = { postsPagination };

  return { props };
};
