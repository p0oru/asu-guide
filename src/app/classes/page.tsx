import { getClasses } from '@/lib/actions';
import ClassesClient from './ClassesClient';

export default async function ClassesPage() {
  const classes = await getClasses();

  return <ClassesClient initialClasses={classes} />;
}
