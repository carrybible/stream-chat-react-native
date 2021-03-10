import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { AttachmentSelectionBar } from '../AttachmentPicker/components/AttachmentSelectionBar';
import { AutoCompleteInput } from '../AutoCompleteInput/AutoCompleteInput';
import { SuggestionsList } from '../AutoCompleteInput/SuggestionsList';

import { useAttachmentPickerContext } from '../../contexts/attachmentPickerContext/AttachmentPickerContext';
import {
  ChannelContextValue,
  useChannelContext,
} from '../../contexts/channelContext/ChannelContext';
import {
  MessageInputContextValue,
  useMessageInputContext,
} from '../../contexts/messageInputContext/MessageInputContext';
import {
  MessagesContextValue,
  useMessagesContext,
} from '../../contexts/messagesContext/MessagesContext';
import {
  SuggestionsContextValue,
  useSuggestionsContext,
} from '../../contexts/suggestionsContext/SuggestionsContext';
import { useTheme } from '../../contexts/themeContext/ThemeContext';
import {
  TranslationContextValue,
  useTranslationContext,
} from '../../contexts/translationContext/TranslationContext';
import { CircleClose, CurveLineLeftUp, Edit, Lightning } from '../../icons';

import type { UserResponse } from 'stream-chat';

import type { Asset } from '../../native';
import type {
  DefaultAttachmentType,
  DefaultChannelType,
  DefaultCommandType,
  DefaultEventType,
  DefaultMessageType,
  DefaultReactionType,
  DefaultUserType,
  UnknownType,
} from '../../types/types';

const styles = StyleSheet.create({
  autoCompleteInputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  composerContainer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  container: {
    borderTopWidth: 1,
    padding: 10,
  },
  editingBoxHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  editingBoxHeaderTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  giphyContainer: {
    alignItems: 'center',
    borderRadius: 12,
    flexDirection: 'row',
    height: 24,
    marginRight: 8,
    paddingHorizontal: 8,
  },
  giphyText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  inputBoxContainer: {
    borderRadius: 20,
    borderWidth: 1,
    flex: 1,
  },
  optionsContainer: {
    flexDirection: 'row',
    paddingBottom: 10,
    paddingRight: 10,
  },
  replyContainer: { paddingBottom: 12, paddingHorizontal: 8 },
  sendButtonContainer: { paddingBottom: 10, paddingLeft: 10 },
  suggestionsListContainer: {
    borderRadius: 10,
    elevation: 3,
    left: 8,
    position: 'absolute',
    right: 8,
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.15,
  },
});

type MessageInputPropsWithContext<
  At extends DefaultAttachmentType = DefaultAttachmentType,
  Ch extends UnknownType = DefaultChannelType,
  Co extends string = DefaultCommandType,
  Ev extends UnknownType = DefaultEventType,
  Me extends UnknownType = DefaultMessageType,
  Re extends UnknownType = DefaultReactionType,
  Us extends UnknownType = DefaultUserType
<<<<<<< HEAD
> = {
  /**
   * Custom UI component for ActionSheetAttachment.
   *
   * Defaults to and accepts same props as: [ActionSheetAttachment](https://getstream.github.io/stream-chat-react-native/#actionsheetattachment)
   */
  ActionSheetAttachment?: React.ComponentType<ActionSheetProps>;
  /**
   * Style object for actionsheet (used for option to choose file attachment or photo attachment).
   * Supported styles: https://github.com/beefe/react-native-actionsheet/blob/master/lib/styles.js
   */
  actionSheetStyles?: ActionSheetStyles;
  /**
   * Additional props for underlying TextInput component. These props will be forwarded as it is to TextInput component.
   *
   * @see See https://reactnative.dev/docs/textinput#reference
   */
  additionalTextInputProps?: TextInputProps;
  /**
   * Custom UI component for attach button.
   *
   * Defaults to and accepts same props as: [AttachButton](https://getstream.github.io/stream-chat-react-native/#attachbutton)
   */
  AttachButton?: React.ComponentType<AttachButtonProps>;
  /**
   * Custom UI component for attachment icon for type 'file' attachment in preview.
   * Defaults to and accepts same props as: https://github.com/GetStream/stream-chat-react-native/blob/master/src/components/Attachment/FileIcon.tsx
   */
  AttachmentFileIcon?: React.ComponentType<FileIconProps>;
  /**
   * Max number of suggestions to display in list. Defaults to 10.
   */
  autocompleteSuggestionsLimit?: number;
  /**
   * Compress image with quality (from 0 to 1, where 1 is best quality).
   * On iOS, values larger than 0.8 don't produce a noticeable quality increase in most images,
   * while a value of 0.8 will reduce the file size by about half or less compared to a value of 1.
   * Image picker defaults to 0.8 for iOS and 1 for Android
   */
  compressImageQuality?: number;
  /**
   * Override of context disabled for disabling input only
   */
  disabled?: boolean;
  /**
   * Override file upload request
   *
   * @param file    File object - { uri: '', name: '' }
   * @param channel Current channel object
   */
  doDocUploadRequest?: (
    file: {
      name: string;
      size?: string | number;
      type?: string;
      uri?: string;
    },
    channel: ChannelContextValue<At, Ch, Co, Ev, Me, Re, Us>['channel'],
  ) => Promise<SendFileAPIResponse>;
  /**
   * Override image upload request
   *
   * @param file    File object - { uri: '' }
   * @param channel Current channel object
   */
  doImageUploadRequest?: (
    file: {
      name?: string;
      uri?: string;
    },
    channel: ChannelContextValue<At, Ch, Co, Ev, Me, Re, Us>['channel'],
  ) => Promise<SendFileAPIResponse>;
  /**
   * Custom UI component for FileUploadPreview.
   * Defaults to and accepts same props as: https://github.com/GetStream/stream-chat-react-native/blob/master/src/components/MessageInput/FileUploadPreview.tsx
   */
  FileUploadPreview?: React.ComponentType<FileUploadPreviewProps>;
  /** If component should have file picker functionality */
  hasFilePicker?: boolean;
  /** If component should have image picker functionality */
  hasImagePicker?: boolean;
  ImageUploadPreview?: React.ComponentType<ImageUploadPreviewProps>;
  /** Initial value to set on input */
  initialValue?: string;

  /**
   * Custom UI component for AutoCompleteInput.
   * Defaults to and accepts same props as: https://github.com/GetStream/stream-chat-react-native/blob/master/src/components/AutoCompleteInput/AutoCompleteInput.tsx
   */
  Input?: React.ComponentType<
    AutoCompleteInputProps<Co, Us> & {
      _pickFile: () => Promise<void>;
      _pickImage: () => Promise<void>;
      _removeFile: FileUploadPreviewProps['removeFile'];
      _removeImage: ImageUploadPreviewProps['removeImage'];
      _uploadFile: FileUploadPreviewProps['retryUpload'];
      _uploadImage: ImageUploadPreviewProps['retryUpload'];
      appendText: (newText: string) => void;
      closeAttachActionSheet: () => void;
      disabled: boolean;
      getUsers: () => UserResponse<Us>[];
      handleOnPress: () => void;
      isValidMessage: () => boolean;
      onSelectItem: (item: UserResponse<Us>) => void;
      sendMessage: () => Promise<void> | void;
      setInputBoxContainerRef: (ref: View | null) => void;
      updateMessage: () => Promise<void>;
      uploadNewFile: (file: {
        name: string;
        size?: number | string;
        type?: string;
        uri?: string;
      }) => Promise<void>;
      uploadNewImage: (image: { uri?: string }) => Promise<void>;
    }
  >;
  /** Limit on allowed number of files to attach at a time. */
  maxNumberOfFiles?: number;
  /**
   * Callback that is called when the text input's text changes. Changed text is passed as a single string argument to the callback handler.
   *
   * @param newText
   */
  onChangeText?: (newText: string) => void;
  onSendMessage?: (prevText: string) => void;
  /** Parent message id - in case of thread */
  parent_id?: StreamMessage<At, Me, Us>['parent_id'];
  /**
   * Custom UI component for send button.
   *
   * Defaults to and accepts same props as: [SendButton](https://getstream.github.io/stream-chat-react-native/#sendbutton)
   */
  SendButton?: React.ComponentType<SendButtonProps>;
  /**
   * For images still in uploading state when user hits send, send text immediately and send image as follow-up message once uploaded
   */
  sendImageAsync?: boolean;
  /**
   * ref for input setter function
   */
  setInputRef?: (ref: TextInput | null) => void;
};
=======
> = Pick<
  ChannelContextValue<At, Ch, Co, Ev, Me, Re, Us>,
  'disabled' | 'members' | 'watchers'
> &
  Pick<
    MessageInputContextValue<At, Ch, Co, Ev, Me, Re, Us>,
    | 'additionalTextInputProps'
    | 'appendText'
    | 'asyncIds'
    | 'asyncUploads'
    | 'AttachButton'
    | 'CommandsButton'
    | 'clearEditingState'
    | 'clearQuotedMessageState'
    | 'editing'
    | 'FileUploadPreview'
    | 'fileUploads'
    | 'giphyActive'
    | 'hasCommands'
    | 'hasFilePicker'
    | 'hasImagePicker'
    | 'ImageUploadPreview'
    | 'imageUploads'
    | 'Input'
    | 'inputBoxRef'
    | 'InputButtons'
    | 'isValidMessage'
    | 'maxNumberOfFiles'
    | 'MoreOptionsButton'
    | 'numberOfUploads'
    | 'pickFile'
    | 'quotedMessage'
    | 'resetInput'
    | 'SendButton'
    | 'sending'
    | 'sendMessageAsync'
    | 'setGiphyActive'
    | 'setShowMoreOptions'
    | 'showMoreOptions'
    | 'ShowThreadMessageInChannelButton'
    | 'removeImage'
    | 'uploadNewImage'
    | 'uploadsEnabled'
  > &
  Pick<MessagesContextValue<At, Ch, Co, Ev, Me, Re, Us>, 'Reply'> &
  Pick<
    SuggestionsContextValue<Co, Us>,
    'componentType' | 'suggestions' | 'suggestionsTitle'
  > &
  Pick<TranslationContextValue, 't'> & {
    threadList?: boolean;
  };
>>>>>>> 5a2d0e827dd4a4067058787b49b07c584f3e370c

export const MessageInputWithContext = <
  At extends DefaultAttachmentType = DefaultAttachmentType,
  Ch extends UnknownType = DefaultChannelType,
  Co extends string = DefaultCommandType,
  Ev extends UnknownType = DefaultEventType,
  Me extends UnknownType = DefaultMessageType,
  Re extends UnknownType = DefaultReactionType,
  Us extends UnknownType = DefaultUserType
>(
  props: MessageInputPropsWithContext<At, Ch, Co, Ev, Me, Re, Us>,
) => {
  const {
    additionalTextInputProps,
    appendText,
    asyncIds,
    asyncUploads,
    clearEditingState,
    clearQuotedMessageState,
    componentType,
    disabled,
    editing,
    FileUploadPreview,
    fileUploads,
    giphyActive,
    hasFilePicker,
    hasImagePicker,
    ImageUploadPreview,
    imageUploads,
    Input,
    inputBoxRef,
    InputButtons,
    isValidMessage,
    maxNumberOfFiles,
    members,
    numberOfUploads,
    pickFile,
    quotedMessage,
    removeImage,
    Reply,
    resetInput,
    SendButton,
    sending,
    sendMessageAsync,
    setGiphyActive,
    ShowThreadMessageInChannelButton,
    suggestions,
    suggestionsTitle,
    t,
    threadList,
    uploadNewImage,
    watchers,
  } = props;

  const [height, setHeight] = useState(0);

  const {
    theme: {
      colors: {
        accent_blue,
        black,
        border,
        grey,
        grey_gainsboro,
        grey_whisper,
        white,
        white_smoke,
      },
      messageInput: {
        attachmentSelectionBar,
        autoCompleteInputContainer,
        composerContainer,
        container,
        editingBoxHeader,
        editingBoxHeaderTitle,
        giphyContainer,
        giphyText,
        inputBoxContainer,
        optionsContainer,
        replyContainer,
        sendButtonContainer,
        suggestionsListContainer,
      },
    },
  } = useTheme();

  const {
    attachmentPickerBottomSheetHeight,
    attachmentSelectionBarHeight,
    bottomInset,
    closePicker,
    openPicker,
    selectedImages,
    selectedPicker,
    setMaxNumberOfFiles,
    setSelectedImages,
    setSelectedPicker,
  } = useAttachmentPickerContext();

  useEffect(() => {
    setMaxNumberOfFiles(maxNumberOfFiles ?? 10);

    return () => {
      closePicker();
      setSelectedPicker(undefined);
    };
  }, [maxNumberOfFiles]);

  const selectedImagesLength = selectedImages.length;
  const imageUploadsLength = imageUploads.length;
  useEffect(() => {
    if (selectedImagesLength > imageUploadsLength) {
      const imagesToUpload = selectedImages.filter((selectedImage) => {
        const uploadedImage = imageUploads.find(
          (imageUpload) =>
            imageUpload.file.uri === selectedImage.uri ||
            imageUpload.url === selectedImage.uri,
        );
        return !uploadedImage;
      });
      imagesToUpload.forEach((image) => uploadNewImage(image));
    } else if (selectedImagesLength < imageUploadsLength) {
      const imagesToRemove = imageUploads.filter(
        (imageUpload) =>
          !selectedImages.find(
            (selectedImage) =>
              selectedImage.uri === imageUpload.file.uri ||
              selectedImage.uri === imageUpload.url,
          ),
      );
      imagesToRemove.forEach((image) => removeImage(image.id));
    }
  }, [selectedImagesLength]);

  useEffect(() => {
    if (imageUploadsLength < selectedImagesLength) {
      const updatedSelectedImages = selectedImages.filter((selectedImage) => {
        const uploadedImage = imageUploads.find(
          (imageUpload) =>
            imageUpload.file.uri === selectedImage.uri ||
            imageUpload.url === selectedImage.uri,
        );
        return uploadedImage;
      });
      setSelectedImages(updatedSelectedImages);
    } else if (imageUploadsLength > selectedImagesLength) {
      setSelectedImages(
        imageUploads
          .map((imageUpload) => ({
            height: imageUpload.file.height,
            source: imageUpload.file.source,
            uri: imageUpload.url,
            width: imageUpload.file.width,
          }))
          .filter(Boolean) as Asset[],
      );
    }
  }, [imageUploadsLength]);

  const editingExists = !!editing;
  useEffect(() => {
    if (editing && inputBoxRef.current) {
      inputBoxRef.current.focus();
    }

    if (!editing) {
      resetInput();
    }
  }, [editingExists]);

  const asyncIdsString = asyncIds.join();
  const asyncUploadsString = Object.values(asyncUploads)
    .map(({ state, url }) => `${state}${url}`)
    .join();
  useEffect(() => {
    if (Object.keys(asyncUploads).length) {
      /**
       * When successful image upload response occurs after hitting send,
       * send a follow up message with the image
       */
      sending.current = true;
      asyncIds.forEach((id) => sendMessageAsync(id));
      sending.current = false;
    }
  }, [asyncIdsString, asyncUploadsString, sendMessageAsync]);

  const getMembers = () => {
    const result: UserResponse<Us>[] = [];
    if (members && Object.values(members).length) {
      Object.values(members).forEach((member) => {
        if (member.user) {
          result.push(member.user);
        }
      });
    }

    return result;
  };

  const getUsers = () => {
    const users = [...getMembers(), ...getWatchers()];

    // make sure we don't list users twice
    const uniqueUsers: { [key: string]: UserResponse<Us> } = {};
    for (const user of users) {
      if (user && !uniqueUsers[user.id]) {
        uniqueUsers[user.id] = user;
      }
    }
    const usersArray = Object.values(uniqueUsers);

    return usersArray;
  };

  const getWatchers = () => {
    const result: UserResponse<Us>[] = [];
    if (watchers && Object.values(watchers).length) {
      result.push(...Object.values(watchers));
    }

    return result;
  };

  const openAttachmentPicker = () => {
    if (hasImagePicker && !fileUploads.length) {
      Keyboard.dismiss();
      openPicker();
      setSelectedPicker('images');
    } else if (hasFilePicker && numberOfUploads < maxNumberOfFiles) {
      pickFile();
    }
  };

  const closeAttachmentPicker = () => {
    if (selectedPicker) {
      setSelectedPicker(undefined);
      closePicker();
    }
  };

  const toggleAttachmentPicker = () => {
    if (selectedPicker) {
      closeAttachmentPicker();
    } else {
      openAttachmentPicker();
    }
  };

  const openCommandsPicker = () => {
    appendText('/');
    if (inputBoxRef.current) {
      inputBoxRef.current.focus();
    }
  };

<<<<<<< HEAD
  const handleOnPress = () => {
    if (
      (maxNumberOfFiles && numberOfUploads >= maxNumberOfFiles) ||
      numberOfUploads >= 10
    ) {
      return;
    }

    if (hasImagePicker) {
      if (hasFilePicker) {
        Keyboard.dismiss();
        if (attachActionSheet?.current) {
          attachActionSheet.current.show();
        }
      } else {
        pickImage();
      }
    } else if (hasFilePicker) {
      pickFile();
    }
=======
  const additionalTextInputContainerProps = {
    editable: disabled ? false : undefined,
    ...additionalTextInputProps,
>>>>>>> 5a2d0e827dd4a4067058787b49b07c584f3e370c
  };

  return (
    <>
      <View
        onLayout={({
          nativeEvent: {
            layout: { height: newHeight },
          },
        }) => setHeight(newHeight)}
        style={[
          styles.container,
          { backgroundColor: white, borderColor: border },
          container,
        ]}
      >
        {(editing || quotedMessage) && (
          <View style={[styles.editingBoxHeader, editingBoxHeader]}>
            {editing ? (
              <Edit pathFill={grey_gainsboro} />
            ) : (
              <CurveLineLeftUp pathFill={grey_gainsboro} />
            )}
            <Text
              style={[
                styles.editingBoxHeaderTitle,
                { color: black },
                editingBoxHeaderTitle,
              ]}
            >
              {editing ? t('Editing Message') : t('Reply to Message')}
            </Text>
            <TouchableOpacity
              disabled={disabled}
              onPress={() => {
                resetInput();
                if (editing) {
                  clearEditingState();
                }
                if (quotedMessage) {
                  clearQuotedMessageState();
                }
                if (inputBoxRef.current) {
                  inputBoxRef.current.blur();
                }
              }}
              testID='close-button'
            >
              <CircleClose pathFill={grey} />
            </TouchableOpacity>
          </View>
        )}
        <View style={[styles.composerContainer, composerContainer]}>
          {Input ? (
            <Input
              additionalTextInputProps={additionalTextInputContainerProps}
              closeAttachmentPicker={closeAttachmentPicker}
              getUsers={getUsers}
              openAttachmentPicker={openAttachmentPicker}
              openCommandsPicker={openCommandsPicker}
              toggleAttachmentPicker={toggleAttachmentPicker}
            />
          ) : (
            <>
<<<<<<< HEAD
              {(hasImagePicker || hasFilePicker) && (
                <AttachButton
                  disabled={disabled}
                  handleOnPress={() => {
                    if (hasImagePicker && hasFilePicker) {
                      Keyboard.dismiss();
                      attachActionSheet.current?.show();
                    } else if (hasImagePicker && !hasFilePicker) pickImage();
                    else if (!hasImagePicker && hasFilePicker) {
                      pickFile();
                    }
                  }}
=======
              <View style={[styles.optionsContainer, optionsContainer]}>
                {InputButtons && (
                  <InputButtons
                    closeAttachmentPicker={closeAttachmentPicker}
                    openAttachmentPicker={openAttachmentPicker}
                    openCommandsPicker={openCommandsPicker}
                    toggleAttachmentPicker={toggleAttachmentPicker}
                  />
                )}
              </View>
              <View
                style={[
                  styles.inputBoxContainer,
                  {
                    borderColor: grey_whisper,
                    paddingVertical: giphyActive ? 8 : 12,
                  },
                  inputBoxContainer,
                ]}
              >
                {((typeof editing !== 'boolean' && editing?.quoted_message) ||
                  quotedMessage) && (
                  <View style={[styles.replyContainer, replyContainer]}>
                    <Reply />
                  </View>
                )}
                {fileUploads.length ? <FileUploadPreview /> : null}
                {imageUploads.length ? <ImageUploadPreview /> : null}
                <View
                  style={[
                    styles.autoCompleteInputContainer,
                    {
                      paddingLeft: giphyActive ? 8 : 16,
                      paddingRight: giphyActive ? 10 : 16,
                    },
                    autoCompleteInputContainer,
                  ]}
                >
                  {giphyActive && (
                    <View
                      style={[
                        styles.giphyContainer,
                        { backgroundColor: accent_blue },
                        giphyContainer,
                      ]}
                    >
                      <Lightning height={16} pathFill={white} width={16} />
                      <Text
                        style={[styles.giphyText, { color: white }, giphyText]}
                      >
                        GIPHY
                      </Text>
                    </View>
                  )}
                  <AutoCompleteInput<At, Ch, Co, Ev, Me, Re, Us>
                    additionalTextInputProps={additionalTextInputProps}
                  />
                  {giphyActive && (
                    <TouchableOpacity
                      disabled={disabled}
                      onPress={() => {
                        setGiphyActive(false);
                      }}
                      testID='close-button'
                    >
                      <CircleClose height={20} pathFill={grey} width={20} />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
              <View style={[styles.sendButtonContainer, sendButtonContainer]}>
                <SendButton
                  disabled={disabled || sending.current || !isValidMessage()}
>>>>>>> 5a2d0e827dd4a4067058787b49b07c584f3e370c
                />
              </View>
            </>
          )}
<<<<<<< HEAD
        </InputBoxContainer>
      </Container>
    );
  };
  const resetInput = (pendingAttachments: Attachment[] = []) => {
    setFileUploads([]);
    setImageUploads([]);
    setMentionedUsers([]);
    setNumberOfUploads(
      (prevNumberOfUploads) =>
        prevNumberOfUploads - (pendingAttachments?.length || 0),
    );
    setText('');
  };

  const sendMessage = () => {
    if (sending.current) {
      return;
    }
    sending.current = true;

    const prevText = text;
    setText('');
    if (inputBoxRef.current) {
      inputBoxRef.current.clear();
    }

    const attachments = [] as Array<Attachment<At>>;
    for (const image of imageUploads) {
      if (!image || image.state === FileState.UPLOAD_FAILED) {
        continue;
      }

      if (image.state === FileState.UPLOADING) {
        // TODO: show error to user that they should wait until image is uploaded
        if (sendImageAsync) {
          /**
           * If user hit send before image uploaded, push ID into a queue to later
           * be matched with the successful CDN response
           */
          setAsyncIds((prevAsyncIds) => [...prevAsyncIds, image.id]);
        } else {
          sending.current = false;
          return setText(prevText);
        }
      }

      if (
        image.state === FileState.UPLOADED ||
        image.state === FileState.FINISHED
      ) {
        attachments.push({
          fallback: image.file.name,
          image_url: image.url,
          type: 'image',
        } as Attachment<At>);
      }
    }

    for (const file of fileUploads) {
      if (!file || file.state === FileState.UPLOAD_FAILED) {
        continue;
      }
      if (file.state === FileState.UPLOADING) {
        // TODO: show error to user that they should wait until image is uploaded
        sending.current = false;
        return;
      }
      if (
        file.state === FileState.UPLOADED ||
        file.state === FileState.FINISHED
      ) {
        attachments.push({
          asset_url: file.url,
          file_size: file.file.size,
          mime_type: file.file.type,
          title: file.file.name,
          type: 'file',
        } as Attachment<At>);
      }
    }

    // Disallow sending message if its empty.
    if (!prevText && attachments.length === 0) {
      sending.current = false;
      return;
    }

    if (editing && !isEditingBoolean(editing)) {
      const updatedMessage = {
        ...editing,
        attachments,
        mentioned_users: mentionedUsers,
        text: prevText,
      } as UpdatedMessage<At, Ch, Co, Me, Re, Us>;

      // TODO: Remove this line and show an error when submit fails
      clearEditingState();
      const updateMessagePromise = editMessage(updatedMessage).then(
        clearEditingState,
      );
      resetInput(attachments);
      logChatPromiseExecution(updateMessagePromise, 'update message');

      sending.current = false;
      if (props.onSendMessage) props.onSendMessage(prevText);
    } else {
      try {
        sendMessageContext(({
          attachments,
          mentioned_users: uniq(mentionedUsers),
          parent_id,
          text: prevText,
        } as unknown) as StreamMessage<At, Me, Us>);

        sending.current = false;
        // setFileUploads([]);
        // setImageUploads([]);
        // setMentionedUsers([]);
        // setNumberOfUploads(
        //   (prevNumberOfUploads) =>
        //     prevNumberOfUploads - (attachments?.length || 0),
        // );
        // setText('');
        resetInput(attachments);
        if (props.onSendMessage) props.onSendMessage(prevText);
      } catch (_error) {
        
        sending.current = false;
        setText(prevText);
        console.log('Failed to send message');
      }
    }
  };

  const setAttachActionSheetRef = (ref: ActionSheetCustom | null) => {
    attachActionSheet.current = ref;
  };

  const setInputBoxRef = (ref: TextInput | null) => {
    inputBoxRef.current = ref;
    if (setInputRef) {
      setInputRef(ref);
    }
  };

  const updateMessage = async () => {
    try {
      if (!isEditingBoolean(editing)) {
        await client.updateMessage({
          ...editing,
          text,
        } as UpdatedMessage<At, Ch, Co, Me, Re, Us>);
      }

      resetInput();
      clearEditingState();
    } catch (error) {
      console.log(error);
    }
  };

  const uploadFile = async ({ newFile }: { newFile: FileUpload }) => {
    if (!newFile) {
      return;
    }
    const { file, id } = newFile;

    await setFileUploads((prevFileUploads) =>
      prevFileUploads.map((fileUpload) => {
        if (fileUpload.id === id) {
          return {
            ...fileUpload,
            state: FileState.UPLOADING,
          };
        }
        return fileUpload;
      }),
    );
=======
        </View>
        <ShowThreadMessageInChannelButton threadList={threadList} />
      </View>
      {componentType && suggestions ? (
        <View
          style={[
            styles.suggestionsListContainer,
            { backgroundColor: white, bottom: height },
            suggestionsListContainer,
          ]}
        >
          <SuggestionsList<Co, Us>
            active={!!suggestions}
            componentType={componentType}
            suggestions={suggestions}
            suggestionsTitle={suggestionsTitle}
          />
        </View>
      ) : null}
      {selectedPicker && (
        <View
          style={[
            {
              backgroundColor: white_smoke,
              height:
                (attachmentPickerBottomSheetHeight
                  ? attachmentPickerBottomSheetHeight +
                    (attachmentSelectionBarHeight ?? 52)
                  : 360) - (bottomInset ?? 0),
            },
            attachmentSelectionBar,
          ]}
        >
          <AttachmentSelectionBar />
        </View>
      )}
    </>
  );
};
>>>>>>> 5a2d0e827dd4a4067058787b49b07c584f3e370c

const areEqual = <
  At extends UnknownType = DefaultAttachmentType,
  Ch extends UnknownType = DefaultChannelType,
  Co extends string = DefaultCommandType,
  Ev extends UnknownType = DefaultEventType,
  Me extends UnknownType = DefaultMessageType,
  Re extends UnknownType = DefaultReactionType,
  Us extends UnknownType = DefaultUserType
>(
  prevProps: MessageInputPropsWithContext<At, Ch, Co, Ev, Me, Re, Us>,
  nextProps: MessageInputPropsWithContext<At, Ch, Co, Ev, Me, Re, Us>,
) => {
  const {
    asyncUploads: prevAsyncUploads,
    disabled: prevDisabled,
    editing: prevEditing,
    fileUploads: prevFileUploads,
    giphyActive: prevGiphyActive,
    imageUploads: prevImageUploads,
    isValidMessage: prevIsValidMessage,
    quotedMessage: prevQuotedMessage,
    sending: prevSending,
    showMoreOptions: prevShowMoreOptions,
    suggestions: prevSuggestions,
    suggestionsTitle: prevSuggestionsTitle,
    t: prevT,
    threadList: prevThreadList,
  } = prevProps;
  const {
    asyncUploads: nextAsyncUploads,
    disabled: nextDisabled,
    editing: nextEditing,
    fileUploads: nextFileUploads,
    giphyActive: nextGiphyActive,
    imageUploads: nextImageUploads,
    isValidMessage: nextIsValidMessage,
    quotedMessage: nextQuotedMessage,
    sending: nextSending,
    showMoreOptions: nextShowMoreOptions,
    suggestions: nextSuggestions,
    suggestionsTitle: nextSuggestionsTitle,
    t: nextT,
    threadList: nextThreadList,
  } = nextProps;

  const tEqual = prevT === nextT;
  if (!tEqual) return false;

  const disabledEqual = prevDisabled === nextDisabled;
  if (!disabledEqual) return false;

  const editingEqual = !!prevEditing === !!nextEditing;
  if (!editingEqual) return false;

  const imageUploadsEqual = prevImageUploads.length === nextImageUploads.length;
  if (!imageUploadsEqual) return false;

  const giphyActiveEqual = prevGiphyActive === nextGiphyActive;
  if (!giphyActiveEqual) return false;

  const quotedMessageEqual =
    !!prevQuotedMessage &&
    !!nextQuotedMessage &&
    typeof prevQuotedMessage !== 'boolean' &&
    typeof nextQuotedMessage !== 'boolean'
      ? prevQuotedMessage.id === nextQuotedMessage.id
      : !!prevQuotedMessage === !!nextQuotedMessage;
  if (!quotedMessageEqual) return false;

  const sendingEqual = prevSending.current === nextSending.current;
  if (!sendingEqual) return false;

  const showMoreOptionsEqual = prevShowMoreOptions === nextShowMoreOptions;
  if (!showMoreOptionsEqual) return false;

  const isValidMessageEqual = prevIsValidMessage() === nextIsValidMessage();
  if (!isValidMessageEqual) return false;

  const asyncUploadsEqual = Object.keys(prevAsyncUploads).every(
    (key) =>
      prevAsyncUploads[key].state === nextAsyncUploads[key].state &&
      prevAsyncUploads[key].url === nextAsyncUploads[key].url,
  );
  if (!asyncUploadsEqual) return false;

  const fileUploadsEqual = prevFileUploads.length === nextFileUploads.length;
  if (!fileUploadsEqual) return false;

  const suggestionsEqual =
    !!prevSuggestions?.data && !!nextSuggestions?.data
      ? prevSuggestions.data.length === nextSuggestions.data.length &&
        prevSuggestions.data.every(
          ({ name }, index) => name === nextSuggestions.data[index].name,
        )
      : !!prevSuggestions === !!nextSuggestions;
  if (!suggestionsEqual) return false;

  const suggestionsTitleEqual = prevSuggestionsTitle === nextSuggestionsTitle;
  if (!suggestionsTitleEqual) return false;

  const threadListEqual = prevThreadList === nextThreadList;
  if (!threadListEqual) return false;

  return true;
};

const MemoizedMessageInput = React.memo(
  MessageInputWithContext,
  areEqual,
) as typeof MessageInputWithContext;

export type MessageInputProps<
  At extends DefaultAttachmentType = DefaultAttachmentType,
  Ch extends UnknownType = DefaultChannelType,
  Co extends string = DefaultCommandType,
  Ev extends UnknownType = DefaultEventType,
  Me extends UnknownType = DefaultMessageType,
  Re extends UnknownType = DefaultReactionType,
  Us extends UnknownType = DefaultUserType
> = Partial<MessageInputPropsWithContext<At, Ch, Co, Ev, Me, Re, Us>>;

/**
 * UI Component for message input
 * It's a consumer of
 * [Channel Context](https://getstream.github.io/stream-chat-react-native/v3/#channelcontext),
 * [Chat Context](https://getstream.github.io/stream-chat-react-native/v3/#chatcontext),
 * [MessageInput Context](https://getstream.github.io/stream-chat-react-native/v3/#messageinputcontext),
 * [Suggestions Context](https://getstream.github.io/stream-chat-react-native/v3/#suggestionscontext), and
 * [Translation Context](https://getstream.github.io/stream-chat-react-native/v3/#translationcontext)
 */
export const MessageInput = <
  At extends DefaultAttachmentType = DefaultAttachmentType,
  Ch extends UnknownType = DefaultChannelType,
  Co extends string = DefaultCommandType,
  Ev extends UnknownType = DefaultEventType,
  Me extends UnknownType = DefaultMessageType,
  Re extends UnknownType = DefaultReactionType,
  Us extends UnknownType = DefaultUserType
>(
  props: MessageInputProps<At, Ch, Co, Ev, Me, Re, Us>,
) => {
  const { disabled = false, members, watchers } = useChannelContext<
    At,
    Ch,
    Co,
    Ev,
    Me,
    Re,
    Us
  >();

  const {
    additionalTextInputProps,
    appendText,
    asyncIds,
    asyncUploads,
    AttachButton,
    clearEditingState,
    clearQuotedMessageState,
    CommandsButton,
    editing,
    FileUploadPreview,
    fileUploads,
    giphyActive,
    hasCommands,
    hasFilePicker,
    hasImagePicker,
    ImageUploadPreview,
    imageUploads,
    Input,
    inputBoxRef,
    InputButtons,
    isValidMessage,
    maxNumberOfFiles,
    MoreOptionsButton,
    numberOfUploads,
    pickFile,
    quotedMessage,
    removeImage,
    resetInput,
    SendButton,
    sending,
    sendMessageAsync,
    setGiphyActive,
    setShowMoreOptions,
    showMoreOptions,
    ShowThreadMessageInChannelButton,
    uploadNewImage,
    uploadsEnabled,
  } = useMessageInputContext<At, Ch, Co, Ev, Me, Re, Us>();

  const { Reply } = useMessagesContext<At, Ch, Co, Ev, Me, Re, Us>();

  const {
    componentType,
    suggestions,
    suggestionsTitle,
  } = useSuggestionsContext<Co, Us>();

  const { t } = useTranslationContext();

  return (
    <MemoizedMessageInput
      {...{
        additionalTextInputProps,
        appendText,
        asyncIds,
        asyncUploads,
        AttachButton,
        clearEditingState,
        clearQuotedMessageState,
        CommandsButton,
        componentType,
        disabled,
        editing,
        FileUploadPreview,
        fileUploads,
        giphyActive,
        hasCommands,
        hasFilePicker,
        hasImagePicker,
        ImageUploadPreview,
        imageUploads,
        Input,
        inputBoxRef,
        InputButtons,
        isValidMessage,
        maxNumberOfFiles,
        members,
        MoreOptionsButton,
        numberOfUploads,
        pickFile,
        quotedMessage,
        removeImage,
        Reply,
        resetInput,
        SendButton,
        sending,
        sendMessageAsync,
        setGiphyActive,
        setShowMoreOptions,
        showMoreOptions,
        ShowThreadMessageInChannelButton,
        suggestions,
        suggestionsTitle,
        t,
        uploadNewImage,
        uploadsEnabled,
        watchers,
      }}
      {...props}
    />
  );
};

MessageInput.displayName = 'MessageInput{messageInput}';
