import { getPlaces } from '@/lib/actions';
import FoodClient from './FoodClient';

export default async function FoodPage() {
  const places = await getPlaces();

  return <FoodClient initialPlaces={places} />;
}
