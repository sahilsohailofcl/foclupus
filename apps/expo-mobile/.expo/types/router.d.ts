/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/..\..\next-web\.next\dev\types\app\(app)\challenges\page` | `/..\..\next-web\.next\dev\types\app\(app)\detox-path\page` | `/..\..\next-web\.next\dev\types\app\(app)\focus-mode\page` | `/..\..\next-web\.next\dev\types\app\(app)\habits\page` | `/..\..\next-web\.next\dev\types\app\(app)\mindfulness\page` | `/..\..\next-web\.next\dev\types\app\(app)\onboarding\page` | `/..\..\next-web\.next\dev\types\app\(app)\profile\page` | `/..\..\next-web\.next\dev\types\app\(app)\progress\page` | `/..\..\next-web\.next\dev\types\app\landing\page` | `/_sitemap` | `/detox-path` | `/focus-mode`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
