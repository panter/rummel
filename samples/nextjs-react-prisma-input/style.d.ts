// styled.d.ts
import { GlobalToken } from 'antd';
import 'styled-components';
interface IPalette {
  main: string;
  contrastText: string;
}
declare module 'styled-components' {
  export interface DefaultTheme {
    antd: GlobalToken;
    pagePaddingSxTop: number;
    pagePaddingSxBottom: number;
    pagePaddingSxRight: number;
    pagePaddingSxLeft: number;
    pagePaddingSmTop: number;
    pagePaddingSmBottom: number;
    pagePaddingSmRight: number;
    pagePaddingSmLeft: number;
    pagePaddingMdTop: number;
    pagePaddingMdBottom: number;
    pagePaddingMdRight: number;
    pagePaddingMdLeft: number;
  }
}
