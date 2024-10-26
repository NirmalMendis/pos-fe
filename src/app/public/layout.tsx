import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import * as React from 'react';

export default async function DashboardPagesLayout(props: { children: React.ReactNode }) {
  return <DashboardLayout>{props.children}</DashboardLayout>;
}
