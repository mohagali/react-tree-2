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
    fontSizes,
    fontWeights,
    fontStyles,
    paddingClasses,
    marginClasses,
    borderRadiuses,
    borderWidths,
    colors,
    backgroundColors,
    textAligns,
    widths,
    heights,
    maxWidths

} from '../../../../utils/constant'
const ImageNode = ({ selectedNode, dispatch }) => {

    const imageRef = React.useRef(null);
    const [image, setImage] = React.useState(null);

    const style = selectedNode?.data?.style
    const fontSize = style && style["font-size"] ? style["font-size"].class : 'base';
    const fontWeight = style && style["font-weight"] ? style["font-weight"].class : 'font-normal';
    const fontStyle = style && style["font-style"] ? style["font-style"].class : 'not-italic';
    const padding = style && style["padding"] ? style["padding"].class : 'p-0';
    const margin = style && style["margin"] ? style["margin"].class : 'm-0';
    const color = style && style["color"] ? style["color"].class : 'inherit';
    const backgroundColor = style && style["background-color"] ? style["background-color"].class : 'inherit';
    const borderRadius = style && style["border-radius"] ? style["border-radius"].class : 'rounded-none';
    const borderWidth = style && style["border-width"] ? style["border-width"].class : 'border-0';
    const textAlign = style && style["text-align"] ? style["text-align"].class : 'text-left';
    const width = style && style["width"] ? style["width"].class : 'w-auto';
    const height = style && style["height"] ? style["height"].class : 'h-auto';
    const maxWidth = style && style["max-width"] ? style["max-width"].class : 'max-w-none';

    const styles = {

        "padding": paddingClasses,
        "margin": marginClasses,
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

    const handleImageChange = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            const file = files[0];
            setImage(file);
            // const targetNodeIndex = nodes.findIndex((n) => n.id === node.id);
            // const targetNode = nodes[targetNodeIndex];
            if (file) {

                const formData = new FormData();
                formData.append('image', file);

                fetch('http://localhost:5000/upload', {
                    method: 'POST',
                    body: formData,
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data); // Handle the server response
                        selectedNode.data.imageUrl = data.imageUrl;
                        dispatch({
                            type: 'changed',
                            node: selectedNode
                        });

                    })
                    .catch((error) => {
                        console.error('Error uploading image:', error);
                    });

            }

        } else {
            setFile(null);
        }
    };

    return <Stack direction={"column"}>
        {/* <BasicTabs /> */}
        <Typography variant="body1">Image</Typography>
        {/* <TextField
            size="small"
            fullWidth
            value={selectedNode?.data.text || ""}
            onChange={
                handleTextProperty
            }
        /> */}

        <input
            ref={imageRef}
            type="file"
            onChange={handleImageChange}
        />

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

export default ImageNode;

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