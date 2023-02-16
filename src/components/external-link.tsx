import React from 'react';
import { Link } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

export default function ExternalLink(props: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link
      isExternal
      href={props.href}
      // inherit our brand override instead
      color=""
    >
      {props.children}
      <ExternalLinkIcon mx="1" />
    </Link>
  );
}
