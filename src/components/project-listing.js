/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Box } from '@theme-ui/components';

const ProjectListing = ({ projects, className }) => (
  <section sx={{ mb: [5, 6, 7] }} className={className}>
    {projects.map((project, index) => (
      <Box mb={4} key={index}>
        <a
          href={project.link}
          sx={{
            fontSize: [1, 2, 3],
            color: `text`,
            textDecoration: 'none',

            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          {project.name}
        </a>
        {` — `}
        <small>{project.status}</small>

        <p
          sx={{
            color: `secondary`,
            mt: 1,
            a: { color: `secondary` },
            fontSize: [1, 1, 2],
          }}
        >
          <span>{project.description}</span>
        </p>
      </Box>
    ))}
  </section>
);

export default ProjectListing;
