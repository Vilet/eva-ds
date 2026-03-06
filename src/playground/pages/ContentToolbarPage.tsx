import './ContentToolbarPage.css';
import ContentToolbar from '../../../patterns/ContentToolbar/ContentToolbar';
import Button from '../../../components/Button/Button';
import Icon from '../../../components/Icon/Icon';

function RecordCounter() {
  return <span className="content-toolbar-counter">Showing 23 records</span>;
}

function ContextDropdown() {
  return (
    <Button
      variant="ghost"
      size="s"
      label="Pipeline or other directory"
      iconRight={<Icon name="chevron-down-ultra" />}
    />
  );
}

function ToolbarActions() {
  return (
    <>
      <Button variant="ghost" size="xs" label="Search.." />
      <Button variant="ghost" size="xs" label="Board" />
      <Button variant="ghost" size="xs" label="Sort" />
      <Button variant="ghost" size="xs" label="Filter" />
      <Button variant="ghost" size="xs" label="Group by Stages" />
      <Button variant="ghost" size="xs" label="Bulk select" />
      <Button variant="ghost" size="xs" label="Actions" />
      <Button variant="ghost" size="xs" label="Weights" />
      <Button variant="ghost" size="xs" label="Customize" />
      <Button
        variant="ghost"
        size="xs"
        iconLeft={<Icon name="more-horizontal" />}
        ariaLabel="More options"
      />
    </>
  );
}

export default function ContentToolbarPage() {
  return (
    <div className="content-toolbar-page">
      <h1 className="page-title">Content Toolbar</h1>
      <p className="page-subtitle">
        Top-level toolbar that sits below the page title and above content.
        The number of controls on the right side varies depending on context.
      </p>

      <section className="variant-section">
        <h2 className="variant-section__title">With table record counter</h2>
        <div className="content-toolbar-demo-row">
          <ContentToolbar left={<RecordCounter />}>
            <ToolbarActions />
          </ContentToolbar>
        </div>
      </section>

      <section className="variant-section">
        <h2 className="variant-section__title">With dropdown to switch the context</h2>
        <div className="content-toolbar-demo-row">
          <ContentToolbar left={<ContextDropdown />}>
            <ToolbarActions />
          </ContentToolbar>
        </div>
      </section>

      <section className="variant-section">
        <h2 className="variant-section__title">Actions only (no left content)</h2>
        <div className="content-toolbar-demo-row">
          <ContentToolbar>
            <ToolbarActions />
          </ContentToolbar>
        </div>
      </section>
    </div>
  );
}
