import Link from 'next/link';
import { formatPostDate } from '../../utils';

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
    <Link href={`/post/${uid}`}>
      <article>
        <header>{title}</header>
        <span>{subtitle}</span>
        <footer>
          <time dateTime={date}>{formatPostDate(date)}</time>
          <span>{author}</span>
        </footer>
      </article>
    </Link>
  );
}
