import { environmentConfig } from './config/environment.config';
import { a } from './util';
import { OVERALL_PROJECT_RELEASE_VERSION } from './version';

export function showHello() {
  return `Hello world ${environmentConfig.CI} ${OVERALL_PROJECT_RELEASE_VERSION} ${a}`;
}

console.info(showHello());
