/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';
import BlogListItem from '@lekoarts/gatsby-theme-minimal-blog/src/components/blog-list-item';

import { getItemYear, getYears } from '../../../utils/getYearStuff';

const NoMatchesFound = ({ searchQuery }) => (
  <section>
    <h2>No matches found</h2>
    <div>
      <p
        sx={{
          color: `text`,
          mt: 1,
          fontSize: [1, 1, 2],
        }}
      >
        {searchQuery && (
          <>
            Sorry, no blog posts were found matching your search for <strong>{searchQuery}</strong>.
          </>
        )}
      </p>
    </div>
  </section>
);

const YearSection = ({ year, children }) => {
  const style = {
    opacity: 0.8,
    fontWeight: '700',
    mt: [3, 4, 5],
    mb: 3,
  };

  return (
    <section>
      <h3 sx={style}>{year}</h3>
      <div>{children}</div>
    </section>
  );
};

const ListingByYear = ({ posts, className, showTags = true, searchQuery = '' }) => {
  const yearsArray = getYears(posts);

  return (
    <div sx={{ mb: [5, 6, 7] }} className={className}>
      {posts.length ? (
        yearsArray.map((year) => (
          <YearSection key={year} year={year}>
            <div>
              {posts.map((post) =>
                getItemYear(post) === year ? (
                  <BlogListItem key={post.slug} post={post} showTags={showTags} />
                ) : undefined
              )}
            </div>
          </YearSection>
        ))
      ) : (
        <NoMatchesFound searchQuery={searchQuery} />
      )}
    </div>
  );
};

export default ListingByYear;
