interface TotalResultsProps {
  query?: string;
  total?: number;
}

const TotalResults: React.FC<TotalResultsProps> = ({ query, total }) => (
  <div className="text-xs sm:text-sm text-purple-100 text-left">
    {total === 0 ? (
      <>
        no results for <span className="text-purple-300">{query}</span>
      </>
    ) : (
      <>total results: {total}</>
    )}
  </div>
);

export default TotalResults;
