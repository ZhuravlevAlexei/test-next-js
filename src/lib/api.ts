import { v4 as uuidv4 } from 'uuid';
const newId = uuidv4();

export interface SummaryStats {
  promotions: number;
  categories: number;
  newCompanies: number;
  activeCompanies: number;
}

export interface SummarySales {
  id: string;
  companyId: string;
  companyTitle: string;
  sold: number;
  income: number;
}

export interface Country {
  id: string;
  title: string;
}

export interface Category {
  id: string;
  title: string;
}

export enum CompanyStatus {
  Active = 'active',
  NotActive = 'notActive',
  Pending = 'pending',
  Suspended = 'suspended',
}

export interface Company {
  id: string;
  title: string;
  description: string;
  status: CompanyStatus;
  joinedDate: string;
  hasPromotions: boolean;
  categoryId: string;
  categoryTitle: string;
  countryId: string;
  countryTitle: string;
  avatar?: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: number;
  companyId: string;
  companyTitle: string;
  avatar?: string;
}
// token for connecting to backend
const PROJECT_TOKEN = process.env.NEXT_PUBLIC_PROJECT_TOKEN;

//--------------------------------   utils functions ----------------------------//
// function for building by using ...rest in [string] url endpoints to backend https://65c21c4ff7e6ea59682aa7e1.mockapi.io/api/v1/
const buildUrl = (...paths: string[]) =>
  `https://${PROJECT_TOKEN}.mockapi.io/api/v1/${paths.join('/')}`;

// function stringify object to query params
const stringifyQueryParams = (params: Record<string, string>) =>
  new URLSearchParams(params).toString();

// function call to fetch() with params & return object json as type T
const sendRequest = async <T>(url: string, init?: RequestInit) => {
  const res = await fetch(url, init);
  if (!res.ok) {
    throw new Error(await res.text());
  }

  return (await res.json()) as T;
};

// functions with request to endpoints

export const getSummaryStats = (init?: RequestInit) => {
  return sendRequest<SummaryStats>(buildUrl('summary-stats', '1'), init);
};

export const getSummarySales = (init?: RequestInit) => {
  return sendRequest<SummarySales[]>(buildUrl('summary-sales'), init);
};

export const getCountries = (init?: RequestInit) => {
  return sendRequest<Country[]>(buildUrl('countries'), init);
};

export const getCategories = (init?: RequestInit) => {
  return sendRequest<Category[]>(buildUrl('categories'), init);
};

export const getCompanies = (init?: RequestInit) => {
  return sendRequest<Company[]>(buildUrl('companies'), init);
};

export const getCompany = (id: string, init?: RequestInit) => {
  return sendRequest<Company>(buildUrl('companies', id), init);
};

export const getPromotions = async (
  params: Record<string, string> = {},
  init?: RequestInit,
) => {
  return sendRequest<Promotion[]>(
    `${buildUrl('promotions')}?${stringifyQueryParams(params)}`,
    init,
  );
};

// -------------------   ф-ції запиту до API ------------------------------------ //

export const createCompany = async (
  data: Omit<Company, 'id' | 'hasPromotions'>, // Omit - встроенный тип утилиты в TypeScript, теперь NewCompany - первый аргумент (тип который подлежит изменению) будет иметь те же свойства, что и Company за исключением id и hasPromotions -объединение имен свойств, которые будут исключены из исходного типа.
  init?: RequestInit, // параметр init ('?'-помечен как необязательный) имеет тип RequestInit - интерфейс браузера с набором опций для настройки HTTP-запроса
) => {
  // const company = {
  //   ...data,
  //   _id: uuidv4(), // Генерация нового идентификатора
  // };
  return sendRequest<Company>(buildUrl('companies'), {
    ...init,
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      ...(init && init.headers),
      'content-type': 'application/json',
    },
  });
};

export const createPromotion = async (
  data: Omit<Promotion, 'id'>,
  init?: RequestInit,
) => {
  return sendRequest<Promotion>(buildUrl('promotions'), {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      ...(init && init.headers),
      'content-type': 'application/json',
    },
  });
};
