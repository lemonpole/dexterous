import React from 'react';
import classNames from 'classnames';
import DeviceDetector from '../device-detector/device-detector';
import { Button, InputGroup, Navbar } from '@blueprintjs/core';
import './header.scss';


interface HeaderProps {
  isDarkTheme: boolean;
  isActiveSearch?: boolean;
  searchBarValue?: string;
  showBackButton?: boolean;
  onBackButtonClick?: () => void;
  onSearchBarChange: ( value: string ) => void;
  onSearchBarClick?: () => void;
  onThemeChange: () => void;
}


export default function Header( props: HeaderProps) {
  const RemoveFilterIcon = (
    <Button
      minimal
      icon="cross"
      disabled={!props.searchBarValue}
      onClick={() => props.onSearchBarChange( '' )}
    />
  );

  const Logo = () => (
    <span className={classNames( 'small-caps', 'upper', )}>
      <b>{'dex'}</b>{'terous'}
    </span>
  );

  const commonInputProps = {
    fill: true,
    large: true,
    placeholder: 'Search...',
    rightElement: RemoveFilterIcon,
    value: props.searchBarValue || '',
    onChange: ( event: React.ChangeEvent<HTMLInputElement> ) => props.onSearchBarChange( event.target.value )
  };

  return (
    <Navbar
      fixedToTop
      id="header"
      className={classNames({ 'search-active': props.isActiveSearch })}
    >
      {/* RENDER LOGO GROUP */}
      <Navbar.Group>
        <Navbar.Heading>
          {/* ALWAYS RENDER LOGO ON DESKTOP */}
          <DeviceDetector.DesktopView>
            <Logo />
          </DeviceDetector.DesktopView>

          {/* SHOW BACK BUTTON ON MOBILE IF ENABLED */}
          <DeviceDetector.MobileView>
            {!props.showBackButton && <Logo />}

            {props.showBackButton && (
              <Button
                minimal
                icon="undo"
                className={classNames( 'small-caps', 'upper', )}
                onClick={props.onBackButtonClick}
              />
            )}
          </DeviceDetector.MobileView>
        </Navbar.Heading>
      </Navbar.Group>

      <Navbar.Group>
        {/* RENDER SEARCH BAR ON DESKTOP */}
        <DeviceDetector.DesktopView>
          <Navbar.Divider />
          <InputGroup
            leftIcon="search"
            {...commonInputProps}
          />
          <Navbar.Divider />
        </DeviceDetector.DesktopView>

        {/* RENDER SEARCH ICON ON MOBILE */}
        <DeviceDetector.MobileView>
          {props.isActiveSearch && (
            <>
              <InputGroup
                autoFocus
                {...commonInputProps}
              />
              <Navbar.Divider />
            </>
          )}
          <Button
            minimal
            icon="search"
            onClick={props?.onSearchBarClick}
          />
          <Navbar.Divider />
        </DeviceDetector.MobileView>

        {/* LIGHT/DARK THEME TOGGLE */}
        <Button
          minimal
          icon={props.isDarkTheme ? 'moon' : 'flash'}
          onClick={props.onThemeChange}
        />
      </Navbar.Group>
    </Navbar>
  );
}
