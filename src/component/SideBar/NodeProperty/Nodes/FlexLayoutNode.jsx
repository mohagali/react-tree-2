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
    flexDirections,
    Gaps,
    justifyContents,
    alignItemss

} from '../../../../utils/constant'

const FlexLayoutNode = ({ selectedNode, dispatch }) => {

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
    const flexDirection = style && style["flex-direction"] ? style["flex-direction"].class : 'flex-row';
    const gap = style && style["gap"] ? style["gap"].class : 'gap-0';
    const justifyContent = style && style["justify-content"] ? style["justify-content"].class : 'justify-normal';
    const alignItems = style && style["align-items"] ? style["align-items"].class : 'items-start';
    const iconType = flexDirection === "flex-row" ? "column" : "row";

    const styles = {

        "padding": paddingClasses,
        "margin": marginClasses,
        "color": colors,
        "background-color": backgroundColors,
        "border-radius": borderRadiuses,
        "border-width": borderWidths,
        "width": widths,
        "height": heights,
        "max-width": maxWidths,
        "flex-direction": flexDirections,
        "gap": Gaps,
        "justify-content": justifyContents,
        "align-items": alignItemss

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
                    style: { ...style, [properties.category]: properties },
                    iconType

                }
            }
        });
    };

    const handleAddNode = (e) => {
    console.log(e.target.value)
        dispatch({
            type: 'added',
            node: {newNodeType:e.target.value,parent:selectedNode.id}
        });

    }

    return <Stack direction={"column"}>

        <Typography variant="body1">New Element</Typography>
        <FormControl size="small">
            <Select
                value={"Selec Element"}
                onChange={handleAddNode}
            >
                {["text", "image", "link", "column", "row"].map(e => {
                    return <MenuItem value={e}>
                        {e}
                    </MenuItem>

                })}
            </Select>
        </FormControl>

        <StyleCategoryLabel labelValue={"Layout"} />
        <AttributeList
            labelValue={"Direction"}
            attributeName={"flex-direction"}
            attributeValue={flexDirection}
            handleStyle={handleStyle}
            styles={styles} />

        <AttributeList
            labelValue={"Gap"}
            attributeName={"gap"}
            attributeValue={gap}
            handleStyle={handleStyle}
            styles={styles} />

        <AttributeList
            labelValue={"Justify Content"}
            attributeName={"justify-content"}
            attributeValue={justifyContent}
            handleStyle={handleStyle}
            styles={styles} />

        <AttributeList
            labelValue={"Align-items"}
            attributeName={"align-items"}
            attributeValue={alignItems}
            handleStyle={handleStyle}
            styles={styles} />

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

export default FlexLayoutNode;

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