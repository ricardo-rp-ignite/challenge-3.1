import { formatPostDate } from '../../utils';

type PostProps = {
  title: string;
  subtitle: string;
  date: string;
  author: string;
};

export function Post({
  title,
  subtitle,
  date,
  author,
}: PostProps): JSX.Element {
  return (
    <article>
      <header>{title}</header>
      <span>{subtitle}</span>
      <footer>
        <time dateTime={date}>{formatPostDate(date)}</time>
        <span>{author}</span>
      </footer>
    </article>
  );
}
