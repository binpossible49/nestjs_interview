import type { config as base } from './env/default';
import type { config as dev } from './env/dev';

export type Objectype = Record<string, unknown>;
export type Default = typeof base;
export type Dev = typeof dev;
export type Config = Default & Dev;
