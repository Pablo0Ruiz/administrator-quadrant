
interface CardProps {
  className?: string;
  title: string;
  children: React.ReactNode;
  href: string;
}


const Card = ({
  className,
  title,
  children,
  href,
}: CardProps) => {
  return (
    <div>
      <a
      className={className}
      href={`${href}?utm_source=create-turbo&utm_medium=basic&utm_campaign=create-turbo"`}
      rel="noopener noreferrer"
      target="_blank"
    >
      <h2>
        {title}
      </h2>
      {children}
      </a>
    </div>
  );
}

export default Card;
