import styles from './styles.module.css';

type ContainerProps = {
  children: React.ReactNode;
};

export function Container(props: ContainerProps) {
  const { children } = props;

  return <h1 className={styles.heading}>{children}</h1>;
}
