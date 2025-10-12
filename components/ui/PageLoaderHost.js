"use client";

import PageLoader from './PageLoader';
import LoaderController from './LoaderController';

export default function PageLoaderHost() {
  return (
    <>
      <PageLoader />
      <LoaderController />
    </>
  );
}
