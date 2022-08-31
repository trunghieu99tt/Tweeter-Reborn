import { EMedia } from '@constants';
import { IMedia } from '@type/app.type';
import { SyntheticEvent } from 'react';
import { EventBusName, onPushEventBus } from 'services/event-bus';
import { v4 as uuid } from 'uuid';

const nFormatter = (num: number, digits = 2): string => {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
    : '0';
};

const formatNumber = (value: number | string): string => {
  return (value && (value as number).toLocaleString('en-US')) || '0';
};

const getDaysDiffBetweenDates = (date1: Date, date2: Date): number => {
  const diff = Math.abs(date1.getTime() - date2.getTime());
  return Math.ceil(diff / (1000 * 3600 * 24));
};

const urlify = (text: string): string => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, '<a href="$1" target="_blank">$1</a>');
};

const validateEmail = (email: string): boolean => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const calcDiffTimeString = (date: Date): string => {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  const diff = Math.floor((Date.now() - date.getTime()) / 1000);

  if (diff < 60) {
    return `${diff} seconds ago`;
  }
  if (diff < 3600) {
    return `${Math.floor(diff / 60)} minutes ago`;
  }
  if (diff < 86400) {
    return `${Math.floor(diff / 3600)} hours ago`;
  }

  return date.toLocaleDateString();
};

export const eliminateSerializeType = <T>(obj: T): Record<string, any> => {
  return JSON.parse(JSON.stringify(obj));
};

// Parse the tweet to extract hashtags and the first url ( for the link's preview )
export const extractMetadata = (
  body: string,
): {
  hashtags: string[];
  urls: string[];
} => {
  const hashtags = body?.match(/(#[\w]+)/g) || [];
  const urls = body?.match(/https?:\/\/\S+/g) || [];

  let tags: string[] = [];

  // Remove duplicates and the hash
  if (hashtags && hashtags?.length > 0) {
    tags = Array.from(new Set(hashtags)).map((h) => h.toString().substr(1));
  }
  return {
    hashtags: tags,
    urls,
  };
};

export const initMediaFromUrl = (url: string): IMedia => {
  return {
    id: uuid(),
    url,
    type: url?.includes(EMedia.Video) ? EMedia.Video : EMedia.Image,
  };
};

export const initMediaFromFile = (file: File): IMedia => {
  return {
    id: uuid(),
    file,
    type: file?.type?.includes(EMedia.Video) ? EMedia.Video : EMedia.Image,
    url: URL.createObjectURL(file),
  };
};

export const stopPropagation = (e: SyntheticEvent) => e.stopPropagation();

export const tryCatchFn = async <T>(
  fn: Function,
  shouldShowError?: boolean,
  customMsg?: string,
): Promise<T> => {
  try {
    const res = await fn();
    return res;
  } catch (error: any) {
    console.error(`${fn.name} error: ${error}`);
    if (shouldShowError) {
      onPushEventBus({
        type: EventBusName.Error,
        payload: customMsg || error?.response?.data?.message,
      });
    }
  }
};

/**
 * Init a model with the _id field from string
 */
export const transformFieldToObjectWithId = <T>(
  field: keyof T,
  data: T,
): void => {
  if (typeof data[field] === 'string') {
    data[field] = {
      _id: data[field],
    } as unknown as T[keyof T];
  }
};

export {
  urlify,
  nFormatter,
  formatNumber,
  validateEmail,
  calcDiffTimeString,
  getDaysDiffBetweenDates,
};
