import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";



type EagerChannel = {
  readonly data: string;
  readonly name: string;
}

type LazyChannel = {
  readonly data: string;
  readonly name: string;
}

export declare type Channel = LazyLoading extends LazyLoadingDisabled ? EagerChannel : LazyChannel

export declare const Channel: (new (init: ModelInit<Channel>) => Channel)

