import Link from 'next/link';
import { FiCalendar, FiUser } from 'react-icons/fi';

import { formatPostDate } from '../../utils';

import styles from './postLink.module.scss';

type PostLinkProps = {
  uid: string;
  title: string;
  subtitle: string;
  date: string;
  author: string;
};

export function PostLink({
  uid,
  title,
  subtitle,
  date,
  author,
}: PostLinkProps): JSX.Element {
  return (
    <Link passHref href={`/post/${uid}`}>
      <a className={styles.link}>
        <article>
          <header>{title}</header>

          <span>{subtitle}</span>

          <footer>
            <time dateTime={date}>
              <FiCalendar />
              {formatPostDate(date)}
            </time>

            <address>
              <FiUser />
              {author}
            </address>
          </footer>
        </article>
      </a>
    </Link>
  );
}
