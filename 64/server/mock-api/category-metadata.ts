import db from '../../mock-server/large-db.json';
import ru from '../../mock-server/category-names.ru.json';

//this is dev api only, should be disabled in prod build
export default defineEventHandler((event) => {
  const lang = getHeader(event, 'Accept-Language');
  let data = db['category-metadata'];
  if (lang?.includes('ru')) {
    data = structuredClone(data);
    for (const item of data) {
      item.text = ((ru as any)[item.text as string] as string) ?? item.text;
    }
  }
  return data;
});
