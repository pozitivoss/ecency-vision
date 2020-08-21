export enum TransactionType {
    CHECKIN = 10,
    LOGIN = 20,
    CHECKIN_EXTRA = 30,
    POST = 100,
    COMMENT = 110,
    VOTE = 120,
    REBLOG = 130,
    DELEGATION = 150,
    REFERRAL = 160,
    TRANSFER_SENT = 998,
    TRANSFER_INCOMING = 999,
    MINTED = 991
}

export interface PointTransaction {
    id: number;
    type: TransactionType;
    created: string;
    memo: string | null;
    amount: string;
    sender: string | null;
    receiver: string | null;
}

export interface Points {
    points: string;
    uPoints: string;
    transactions: PointTransaction[];
}

export enum ActionTypes {
    FETCHED = "@points/FETCHED",
    RESET = "@points/RESET",
}

export interface FetchedAction {
    type: ActionTypes.FETCHED;
    points: string;
    uPoints: string;
    transactions?: PointTransaction[];
}

export interface ResetAction {
    type: ActionTypes.RESET;
}


export type Actions = FetchedAction | ResetAction;
