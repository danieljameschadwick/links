import React, { useState } from "react";
import StyleSheet from "react-native-media-query";
import { Text, TextInput as NativeTextInput, View } from "react-native-web";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
    borderRadius: 5,
  },
  outlineContainer: {
    borderRadius: 8,
    outlineStyle: "solid",
    outlineColor: "rgb(154, 154, 154)",
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
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    width: "100%",
    outline: "none",
  },
});

type Props = {
  placeholder: string;
  textContentType: string;
  onChange: (event) => void;
  onSubmit: () => void;
  label?: string | null;
};

export const TextInput: React.FC<Props> = (
  {
    placeholder,
    textContentType,
    onChange,
    onSubmit,
    label = null,
  }
) => {
  const [onClick, setOnClick] = useState<boolean>(false);
  const container = [ styles.container ];

  if (onClick) container.push(styles.outlineContainer);

  return (
    <View style={container}>
      { label &&
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>
            {label}
          </Text>
        </View>
      }

      <NativeTextInput
        textContentType={textContentType}
        style={styles.input}
        dataSet={{ media: ids.input }}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={() => setOnClick(true)}
        onBlur={() => setOnClick(false)}
        onSubmitEditing={onSubmit}
      />
    </View>
  );
};
