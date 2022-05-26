import React, { useState } from "react";
import StyleSheet from "react-native-media-query";
import { Text, TextInput as NativeTextInput, View } from "react-native-web";

const { ids, styles } = StyleSheet.create({
  container: {
    display: "flex",
    marginBottom: 10,
  },
  inputContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    borderRadius: 5,
  },
  outlineContainer: {
    borderRadius: 8,
    outlineStyle: "solid",
    outlineColor: "rgb(124,124,124)",
    outlineWidth: 2,

  },
  labelContainer: {
    height: 42,
    justifyContent: "center",
    backgroundColor: "rgb(245, 246, 248)",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    padding: "10px",
  },
  labelText: {
    fontWeight: "700",
  },
  input: {
    height: 42,
    fontSize: 14,
    backgroundColor: "rgb(245, 246, 248)",
    paddingLeft: 10,
    borderRadius: 5,
    width: "100%",
    outline: "none",
  },
  labelInput: {
    paddingLeft: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  helpText: {
    marginTop: 5,
    fontSize: 10,
    fontStyle: "italic",
  }
});

type Props = {
  placeholder: string;
  textContentType: string;
  onChange: (event) => void;
  onSubmitEditing: () => void;
  label?: string | React.ReactNode;
  defaultValue?: string;
  helpText?: string;
  secureTextEntry?: boolean;
};

export const TextInput: React.FC<Props> = (
  {
    placeholder,
    textContentType,
    onChange,
    onSubmitEditing,
    label = null,
    defaultValue = null,
    helpText = null,
    secureTextEntry = false,
  }
) => {
  const [onClick, setOnClick] = useState<boolean>(false);
  const inputContainer = [ styles.inputContainer ];
  const input = [ styles.input ];

  if (onClick) inputContainer.push(styles.outlineContainer);
  if (label) input.push(styles.labelInput);

  return (
    <View style={styles.container}>
      <View style={inputContainer}>
        { label &&
          <View style={styles.labelContainer}>
            <Text style={styles.labelText}>
              {label}
            </Text>
          </View>
        }

        <NativeTextInput
          textContentType={textContentType}
          style={input}
          dataSet={{ media: ids.input }}
          placeholder={placeholder}
          defaultValue={defaultValue}
          onChange={onChange}
          onFocus={() => setOnClick(true)}
          onBlur={() => setOnClick(false)}
          onSubmitEditing={onSubmitEditing}
          secureTextEntry={secureTextEntry}
        />
      </View>

      { helpText &&
        <Text style={styles.helpText}>
          * {helpText}
        </Text>
      }
    </View>
  );
};
