import * as React from "react";
import { Box, Stack, Typography, TextField } from "@mui/material";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import {

    paddingClasses,
    marginClasses,
    borderRadiuses,
    borderWidths,
    colors,
    backgroundColors,
    widths,
    heights,
    maxWidths,

} from '../../../../utils/constant'

const BoxNode = ({ selectedNode, dispatch }) => {

    const style = selectedNode?.data?.style
    const padding = style && style["padding"] ? style["padding"].class : 'p-0';
    const margin = style && style["margin"] ? style["margin"].class : 'm-0';
    const color = style && style["color"] ? style["color"].class : 'inherit';
    const backgroundColor = style && style["background-color"] ? style["background-color"].class : 'inherit';
    const borderRadius = style && style["border-radius"] ? style["border-radius"].class : 'rounded-none';
    const borderWidth = style && style["border-width"] ? style["border-width"].class : 'border-0';
    const width = style && style["width"] ? style["width"].class : 'w-auto';
    const height = style && style["height"] ? style["height"].class : 'h-auto';
    const maxWidth = style && style["max-width"] ? style["max-width"].class : 'max-w-none';

    const styles = {

        "padding": paddingClasses,
        "margin": marginClasses,
        "color": colors,
        "background-color": backgroundColors,
        "border-radius": borderRadiuses,
        "border-width": borderWidths,
        "width": widths,
        "height": heights,
        "max-width": maxWidths

    }

    const handleStyle = (event, styleName) => {
        if (!event.target.value)
            return;
        const newClassName = event.target.value
        const newStyle = styles[styleName].find(e => e.class == newClassName)
        handleProperty(newStyle)
    };

    const handleProperty = (properties) => {
        dispatch({
            type: 'changed',
            node: {
                ...selectedNode,
                data: {
                    ...selectedNode.data,
                    style: { ...style, [properties.category]: properties }
                }
            }
        });
    };

    const handleTextProperty = (e) => {
        dispatch({
            type: 'changed',
            node: {
                ...selectedNode,
                data: {
                    ...selectedNode.data,
                    text: e.target.value
                }
            }
        });
    };

    return <Stack direction={"column"}>


        <StyleCategoryLabel labelValue={"Spacing"} />
        <AttributeList
            labelValue={"Inner Space"}
            attributeName={"padding"}
            attributeValue={padding}
            handleStyle={handleStyle}
            styles={styles} />

        <AttributeList
            labelValue={"Outer Space"}
            attributeName={"margin"}
            attributeValue={margin}
            handleStyle={handleStyle}
            styles={styles} />

        <StyleCategoryLabel labelValue={"Colors"} />
        <AttributeList
            labelValue={"Color"}
            attributeName={"color"}
            attributeValue={color}
            handleStyle={handleStyle}
            styles={styles} />

        <AttributeList
            labelValue={"Background"}
            attributeName={"background-color"}
            attributeValue={backgroundColor}
            handleStyle={handleStyle}
            styles={styles} />

        <StyleCategoryLabel labelValue={"Border"} />
        <AttributeList
            labelValue={"Rounded"}
            attributeName={"border-radius"}
            attributeValue={borderRadius}
            handleStyle={handleStyle}
            styles={styles} />

        <AttributeList
            labelValue={"Thickness"}
            attributeName={"border-width"}
            attributeValue={borderWidth}
            handleStyle={handleStyle}
            styles={styles} />
            
        <StyleCategoryLabel labelValue={"Size"} />
        <AttributeList
            labelValue={"Width"}
            attributeName={"width"}
            attributeValue={width}
            handleStyle={handleStyle}
            styles={styles} />
        <AttributeList
            labelValue={"Height"}
            attributeName={"height"}
            attributeValue={height}
            handleStyle={handleStyle}
            styles={styles} />
        <AttributeList
            labelValue={"Limit width"}
            attributeName={"max-width"}
            attributeValue={maxWidth}
            handleStyle={handleStyle}
            styles={styles} />

    </Stack>
}

export default BoxNode;

const StyleCategoryLabel = ({ labelValue }) => {

    return <Typography variant="h6" fullWidth sx={{
        color: 'white',
        borderRadius: '0.5rem',
        paddingLeft: '0.5rem',
        backgroundColor: "gray",
        marginY: '0.5rem'
    }}>{labelValue}</Typography>
}

const AttributeList = ({ labelValue, attributeName, attributeValue, handleStyle, styles }) => {

    return <>
        <Typography variant="body1">{labelValue}</Typography>
        <FormControl size="small">
            <Select
                value={attributeValue}
                onChange={(e) => handleStyle(e, attributeName)}
            >
                {styles[attributeName].map(e => {
                    return <MenuItem value={e.class}>
                        {e.class}
                    </MenuItem>

                })}
            </Select>
        </FormControl>
    </>

}