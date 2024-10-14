import { cache } from 'react';
import { QueryClient } from '@tanstack/react-query';

// ф-ція що використовується на сервері та створює QueryClient - лише один раз (на запит), запобігає розподілу даних між користувачами та запитами
const getQueryClient = cache(() => new QueryClient()) as () => QueryClient;
export default getQueryClient;
