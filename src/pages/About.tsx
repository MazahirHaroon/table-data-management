import { PrimaryHeading } from '@custom-ui';

const About = () => {
  return (
    <div className='flex flex-col items-center gap-6 p-6 max-w-3xl mx-auto text-center'>
      <PrimaryHeading text='About This Project' />

      <p className='text-text-color-body text-base leading-relaxed'>
        This project showcases a reusable and highly performant React table
        component that can efficiently handle very large datasets. The
        implementation focuses on scalability, accessibility, and flexibility —
        allowing any page to plug in table features with minimal configuration.
      </p>

      <section className='text-left w-full bg-yellow-50 p-4 rounded-md border border-yellow-300'>
        <h2 className='font-family-heading text-secondary-heading mb-2'>
          Important Note About Backend Load Time
        </h2>
        <p className='text-text-color-body text-sm leading-relaxed'>
          The backend API runs on Render's free tier, which automatically puts
          the server to sleep when it has been inactive for a while. Because of
          this, the
          <strong> first request can take around 40-60 seconds </strong> (or
          slightly more) while the server wakes up.
        </p>
        <p className='text-text-color-body text-sm leading-relaxed mt-2'>
          After the initial response, the API becomes fully active and all
          subsequent requests are fast. Once the data has loaded, the table
          performs smoothly with no delays.
        </p>
      </section>

      <section className='text-left w-full'>
        <h2 className='font-family-heading text-secondary-heading mb-2'>
          Core Capabilities
        </h2>
        <p className='text-text-color-body text-sm mb-2'>
          Note: <strong>virtualization is always enabled</strong> in this
          version to guarantee consistent performance on large datasets.
        </p>
        <ul className='list-disc pl-6 text-text-color-body space-y-1'>
          <li>
            Virtualized rendering for smooth scrolling with thousands of rows
          </li>
          <li>Search across any selected columns</li>
          <li>Sorting (ascending / descending) on any column</li>
          <li>Filtering with fully configurable filter options</li>
          <li>Row selection with checkbox controls and custom actions</li>
          <li>
            All features can be combined in any order (search → sort → filter or
            any sequence)
          </li>
        </ul>
      </section>

      <section className='text-left w-full'>
        <h2 className='font-family-heading text-secondary-heading mb-2'>
          Example Pages
        </h2>

        <h3 className='font-semibold mt-4 mb-1 text-text-color-subheading'>
          Characters Table
        </h3>
        <ul className='list-disc pl-6 text-text-color-body space-y-1'>
          <li>
            Contains <strong>1,000 rows</strong>
          </li>
          <li>
            Searchable by <strong>name</strong> and <strong>location</strong>
          </li>
          <li>
            Filterable by <strong>health</strong> (Healthy, Injured, Critical)
          </li>
          <li>
            Sortable by <strong>power</strong> (asc/desc)
          </li>
          <li>Supports multi-row selection with action buttons</li>
        </ul>

        <h3 className='font-semibold mt-4 mb-1 text-text-color-subheading'>
          Cities Table
        </h3>
        <ul className='list-disc pl-6 text-text-color-body space-y-1'>
          <li>
            Contains <strong>23,016 rows</strong>
          </li>
          <li>
            Searchable by <strong>name</strong>, <strong>country</strong>, and{' '}
            <strong>subCountry</strong>
          </li>
          <li>Sortable by name, country, or subCountry</li>
          <li>
            Filterable by a sample set of countries (India, United States,
            United Kingdom)
          </li>
          <li>Includes row selection with custom actions</li>
        </ul>
      </section>

      <section className='text-left w-full'>
        <h2 className='font-family-heading text-secondary-heading mb-2'>
          Hosting & Data Source
        </h2>
        <ul className='list-disc pl-6 text-text-color-body space-y-1'>
          <li>
            Frontend: React app is deployed on <strong>Hostinger</strong>
          </li>
          <li>
            Backend: JSON API hosted on <strong>Render</strong> (Node.js). For
            local development, run a local <strong>json-server</strong>.
          </li>
          <li>
            In production the table fetches data from the Render-hosted API.
          </li>
        </ul>
      </section>

      <section className='text-left w-full'>
        <h2 className='font-family-heading text-secondary-heading mb-2'>
          Reusable Components
        </h2>
        <p className='text-text-color-body mb-2'>
          The table system is built on a modular architecture with reusable UI
          elements:
        </p>
        <ul className='list-disc pl-6 text-text-color-body space-y-1'>
          <li>Custom Input, Checkbox, and Button components</li>
          <li>
            Dedicated <strong>Table</strong>, <strong>Header</strong>, and{' '}
            <strong>Row</strong> components
          </li>
          <li>Hooks for search, filter, sort, and selection logic</li>
          <li>
            Config-driven setup — pass headers, features, and options, and the
            table configures itself
          </li>
        </ul>
      </section>
    </div>
  );
};

export default About;
