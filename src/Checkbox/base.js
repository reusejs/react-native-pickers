import React, {useState, useEffect} from 'react';
import {View, Pressable, Text, SafeAreaView, TextInput} from 'react-native';
import {CheckIcon} from '../icons';
import useSearchSelect from '../useSearchSelect';

const Index = ({
  label,
  id,
  showLabel = true,
  OptionsRenderer,
  SelectedDataRenderer = null,
  SearchRenderer = null,
  disabled = false,
  onChange,
  multiple = false,
  dataSource,
  icon,
  defaultSelected = [],
  ...props
}) => {
  const {options, addOrRemove, selected} = useSearchSelect(
    onChange,
    dataSource,
    defaultSelected,
  );
  const textStyles = {
    ...(props.textStyles || {
      fontWeight: 'bold',
      color: props.textColor || '#000',
      letterSpacing: 0,
    }),
  };

  return (
    <View
      style={{
        position: 'relative',
      }}>
      {label !== '' && label !== undefined && showLabel && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 12,
            marginBottom: 7,
          }}>
          <Text style={textStyles}>{label}</Text>
          <View style={{marginLeft: 12}}>{icon}</View>
        </View>
      )}
      <View>
        <CheckIcon />
      </View>
      <View style={{...props.pickerWrapperStyles}}>
        <View style={{...props.optionsWrapperStyles}}>
          {options.length > 0 && (
            <>
              {options.map(option => (
                <View
                  onPress={() => {
                    addOrRemove(multiple, option);
                  }}
                  key={`option${option.value}`}>
                  <OptionsRenderer
                    value={option}
                    selected={selected}
                    props={props}
                  />
                </View>
              ))}
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default Index;