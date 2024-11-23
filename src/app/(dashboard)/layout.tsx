import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import * as React from 'react';

export default async function DashboardPagesLayout(props: { children: React.ReactNode }) {
  return (
    <DashboardLayout defaultSidebarCollapsed>
      <PageContainer sx={{ p: 0, m: 0 }} maxWidth={false}>
        {props.children}
      </PageContainer>
    </DashboardLayout>
  );
}
