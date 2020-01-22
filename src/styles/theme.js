import React from 'react';
import { ThemeProvider, ThemeConsumer } from '@stream-io/styled-components';
import merge from 'lodash/merge';
import lodashSet from 'lodash/set';
import lodashGet from 'lodash/get';
import mapValues from 'lodash/mapValues';
import isPlainObject from 'lodash/isPlainObject';

export const BASE_FONT_SIZE = 16;

export const Colors = {
  left: '#EBEBEB',
  right: '#EBEBEB',
  primary: '#006cff',
  secondary: '#111',
  danger: '#EDD8DD',
  light: '#EBEBEB',
  textLight: 'white',
  textDark: 'rgba(0,0,0,1)',
  textGrey: 'rgba(0,0,0,0.5)',
  transparent: 'transparent',
};

export const defaultTheme = {
  colors: {
    ...Colors,
  },
  avatar: {
    container: {},
    image: {},
    text: {},
    fallback: {},
  },

  channelPreview: {
    container: {},
    details: {},
    detailsTop: {},
    title: {},
    date: {},
    message: {
      color: '#767676',
      unreadColor: '#000',
      fontWeight: 'normal',
      unreadFontWeight: 'bold',
    },
  },

  closeButton: {
    container: {},
  },

  iconBadge: {
    container: {},
    icon: {},
    iconInner: {},
    unreadCount: {},
  },

  message: {
    text: { css: {} },
    container: {},
    content: {
      container: {
        borderRadiusL: 16,
        borderRadiusS: 2,
      },
      containerInner: {},
      metaContainer: {},
      metaText: {},
      errorContainer: {
        backgroundColor: Colors.danger,
      },
      deletedContainer: {},
      deletedText: {},
      textContainer: {
        borderRadiusL: 16,
        borderRadiusS: 2,
        leftBorderWidth: 0.5,
        leftBorderColor: 'rgba(0,0,0,0.08)',
        rightBorderWidth: 0,
        rightBorderColor: 'transparent',
      },
      // Available options for styling text: https://github.com/CharlesMangwa/react-native-simple-markdown/tree/next#styles-1
      markdown: {},
    },
    status: {
      spacer: {},
      deliveredContainer: {},
      deliveredCircle: {},
      checkMark: {},
      sendingContainer: {},
      sendingImage: {},
      readByContainer: {},
      readByCount: {},
    },
    avatarWrapper: {
      container: {},
      spacer: {},
    },
    replies: {
      container: {},
      messageRepliesText: {},
      image: {},
    },
    file: {
      container: {},
      details: {},
      title: {},
      size: {},
    },
    actions: {
      container: {},
      button: {
        primaryBackgroundColor: Colors.primary,
        defaultBackgroundColor: 'white',
        primaryBorderColor: Colors.light,
        defaultBorderColor: 'transparent',
      },
      buttonText: {
        primaryColor: 'white',
        defaultColor: 'black',
      },
    },
    card: {
      container: {},
      cover: {},
      footer: {},
      title: {},
      description: {},
      url: {},
    },

    gallery: {
      width: 240,
      size: 120,
      halfSize: 80,
      doubleSize: 240,

      single: {},
      imageContainer: {},
      galleryContainer: {},
      header: {
        container: {},
        button: {},
      },
    },
    reactionList: {
      container: {},
      reactionCount: {},
    },

    reactionPicker: {
      container: {},
      containerView: {},
      column: {},
      emoji: {},
      reactionCount: {},
      text: {},
    },
    actionSheet: {
      titleContainer: {},
      titleText: {},
      buttonContainer: {},
      buttonText: {},
      cancelButtonContainer: {},
      cancelButtonText: {},
    },
  },

  messageInput: {
    container: {
      conditionalPadding: 20,
    },
    inputBox: {},
    inputBoxContainer: {},
    attachButton: {},
    attachButtonIcon: {},
    sendButton: {},
    sendButtonIcon: {},
    imageUploadPreview: {
      container: {},
      itemContainer: {},
      dismiss: {},
      dismissImage: {},
      upload: {},
    },
    uploadProgressIndicator: {
      overlay: {},
      container: {},
    },

    suggestions: {
      wrapper: {},
      container: {
        maxHeight: 250,
        itemHeight: 50,
      },
      title: {},
      separator: {},
      item: {},
      mention: {
        container: {},
        name: {},
      },
      command: {
        container: {},
        top: {},
        title: {},
      },
    },
    actionSheet: {
      titleContainer: {},
      titleText: {},
      buttonContainer: {},
      buttonText: {},
    },
  },

  messageList: {
    listContainer: {},
    messageNotification: {
      container: {},
      text: {},
    },
    errorNotification: {},
    errorNotificationText: {},
    dateSeparator: {
      container: {},
      line: {},
      date: {},
      dateText: {},
    },
    messageSystem: {
      container: {},
      line: {},
      text: {},
      textContainer: {},
      dateText: {},
    },
    eventIndicator: {
      date: {},
      memberUpdateContainer: {},
      memberUpdateTextContainer: {},
      memberUpdateText: {},
    },
    typingIndicatorContainer: {},
  },

  spinner: {},

  thread: {
    newThread: {
      text: {},
    },
  },

  typingIndicator: {
    text: {
      fontSize: 14,
      color: Colors.textGrey,
    },
  },
};

export const themed = (OriginalComponent) => {
  if (OriginalComponent.themePath == null) {
    throw Error('Only use themed on components that have a static themePath');
  }
  class ThemedComponent extends React.Component {
    static themePath = OriginalComponent.themePath;
    static extraThemePaths = OriginalComponent.extraThemePaths;
    static displayName = `Themed${getDisplayName(OriginalComponent)}`;

    render() {
      // console.log(`Themed${getDisplayName(OriginalComponent)}`, this.props);
      const { style, forwardedRef, ...props } = this.props;

      return (
        <ThemeConsumer>
          {(themeProviderTheme) => {
            if (!style && themeProviderTheme) {
              return <OriginalComponent {...props} ref={forwardedRef} />;
            }
            let modifiedTheme = themeProviderTheme || defaultTheme;
            if (style) {
              const themeDiff = {};
              const path = [];

              // replaces
              // { 'avatar.fallback': 'background-color: red;' }
              // with
              // { 'avatar.fallback': { css: 'background-color: red;' } }
              const replaceCssShorthand = (v) => {
                if (isPlainObject(v)) {
                  const m = mapValues(v, (v, k) => {
                    path.push(k);
                    return replaceCssShorthand(v);
                  });
                  path.pop();
                  return m;
                }
                if (isPlainObject(lodashGet(defaultTheme, path.join('.')))) {
                  path.pop();
                  return { css: v };
                }
                path.pop();
                return v;
              };

              const s = replaceCssShorthand(style);
              for (const k in s) {
                if (
                  lodashGet(defaultTheme, OriginalComponent.themePath + '.' + k)
                ) {
                  merge(
                    themeDiff,
                    lodashSet({}, OriginalComponent.themePath + '.' + k, s[k]),
                  );
                } else if (lodashGet(defaultTheme, k)) {
                  merge(themeDiff, lodashSet({}, k, s[k]));
                } else {
                  throw Error(`Unknown theme key ${k}`);
                }
              }

              modifiedTheme = merge({}, modifiedTheme, themeDiff);
            }
            return (
              <ThemeProvider theme={modifiedTheme}>
                <OriginalComponent {...props} ref={forwardedRef} />
              </ThemeProvider>
            );
          }}
        </ThemeConsumer>
      );
    }
  }

  return React.forwardRef((props, ref) => (
    <ThemedComponent {...props} forwardedRef={ref} />
  ));
};

// Copied from here:
// https://reactjs.org/docs/higher-order-components.html#convention-wrap-the-display-name-for-easy-debugging
function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export const originalCSS = {};

export function setOriginalCSS(path, string) {
  // remove junk at the start and end of the code snippet
  string = string
    .split('`')[1]
    .split('\n')
    .slice(1, -2)
    .join('\n');
  lodashSet(originalCSS, path + '.defaultCSS', string);
}
