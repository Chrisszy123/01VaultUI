export type WalletType =
  | {
      res: any;
      status?: boolean;
    }
  | undefined;

export type Wallet = {
    name: string,
    link: string
}

export interface _Wallet {
  [key: string] : Wallet[] | [] | Array<Wallet[]> | any
}