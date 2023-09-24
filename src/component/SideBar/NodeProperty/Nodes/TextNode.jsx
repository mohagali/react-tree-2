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
    backgroundColors

} from './../../../../utils/constant'
const TextNode = ({ selectedNode, dispatch }) => {

    // const [fontWeight, setFontWeight] = React.useState(selectedNode?.data?.fontWeight??'font-normal');
    // const [fontSize, setFontSize] = React.useState(selectedNode?.data?.fontSize??'base');
    // const [fontStyle, setFontStyle] = React.useState(selectedNode?.data?.fontStyle??'not-italic');
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


    const handleFontSize = (event) => {
        if (!event.target.value)
            return;
        const newFontSize = event.target.value
        const textFontSize = fontSizes.find(e => e.class == newFontSize)
        handleProperty(textFontSize)
    };

    const handleFontWeight = (event) => {
        if (!event.target.value)
            return;
        const newFontWeight = event.target.value
        const textFontWeight = fontWeights.find(e => e.class == newFontWeight)
        handleProperty(textFontWeight)
    };

    const handleFontStyle = (event) => {
        if (!event.target.value)
            return;
        const newFontStyle = event.target.value
        const textFontStyle = fontStyles.find(e => e.class == newFontStyle)
        handleProperty(textFontStyle)
    };
    const handlePaddingClasses = (event) => {
        if (!event.target.value)
            return;
        const newPadding = event.target.value
        const padding = paddingClasses.find(e => e.class == newPadding)
        handleProperty(padding)
    };

    const handleMarginClasses = (event) => {
        if (!event.target.value)
            return;
        const newMargin = event.target.value
        const margin = marginClasses.find(e => e.class == newMargin)
        handleProperty(margin)
    };

    const handleBorderRadiuses = (event) => {
        if (!event.target.value)
            return;
        const newBorderRadius = event.target.value
        const borderRadius = borderRadiuses.find(e => e.class == newBorderRadius)
        handleProperty(borderRadius)
    };

    const handleBorderWidth = (event) => {
        if (!event.target.value)
            return;
        const newBorderWidth = event.target.value
        const borderWidth = borderWidths.find(e => e.class == newBorderWidth)
        handleProperty(borderWidth)
    };

    const handleColor = (event) => {
        if (!event.target.value)
            return;
        const newColor = event.target.value
        const color = colors.find(e => e.class == newColor)
        handleProperty(color)
    };

    const handleBackgroundColor = (event) => {
        if (!event.target.value)
            return;
        const newBackgroundColor = event.target.value
        const backgroundColor = backgroundColors.find(e => e.class == newBackgroundColor)
        handleProperty(backgroundColor)
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
        {/* <BasicTabs /> */}
        <Typography variant="body1">Text</Typography>
        <TextField
            size="small"
            fullWidth
            value={selectedNode?.data.text || ""}
            onChange={
                handleTextProperty
            }
        />


        <Typography variant="h6" fullWidth sx={{
            color: 'white',
            borderRadius: '0.5rem',
            paddingLeft: '0.5rem',
            backgroundColor: "gray",
            marginY: '0.5rem'
        }}>Font</Typography>
        <Typography variant="body1">Size</Typography>
        <FormControl size="small">
            <Select
                value={fontSize}
                onChange={handleFontSize}
            >

                {fontSizes.map(e => {
                    return <MenuItem value={e.class}>
                        {e.class}
                    </MenuItem>

                })}
            </Select>
        </FormControl>
        <Typography variant="body1">Thickness</Typography>
        <FormControl size="small">
            <Select
                value={fontWeight}
                onChange={handleFontWeight}
            >
                {fontWeights.map(e => {
                    return <MenuItem value={e.class}>
                        {e.class}
                    </MenuItem>

                })}
            </Select>
        </FormControl>
        <Typography variant="body1" >Style</Typography>
        <FormControl size="small">
            <Select
                value={fontStyle}
                onChange={handleFontStyle}
            >

                {fontStyles.map(e => {
                    return <MenuItem value={e.class}>
                        {e.class}
                    </MenuItem>

                })}
            </Select>
        </FormControl>
        <Typography variant="h6" fullWidth sx={{
            color: 'white',
            borderRadius: '0.5rem',
            paddingLeft: '0.5rem',
            backgroundColor: "gray",
            marginY: '0.5rem'
        }}>Spacing</Typography>
        <Typography variant="body1">Inner Space</Typography>
        <FormControl size="small">
            <Select
                value={padding}
                onChange={handlePaddingClasses}
            >
                {paddingClasses.map(e => {
                    return <MenuItem value={e.class}>
                        {e.class}
                    </MenuItem>

                })}
            </Select>
        </FormControl>
        <Typography variant="body1">Outer Space</Typography>
        <FormControl size="small">
            <Select
                value={margin}
                onChange={handleMarginClasses}
            >
                {marginClasses.map(e => {
                    return <MenuItem value={e.class}>
                        {e.class}
                    </MenuItem>

                })}
            </Select>
        </FormControl>
        <Typography fullWidth sx={{
            color: 'white',
            borderRadius: '0.5rem',
            paddingLeft: '0.5rem',
            backgroundColor: "gray",
            marginY: '0.5rem'
        }} variant="h6">Color</Typography>
        <Typography variant="body1">Color</Typography>
        <FormControl size="small">
            <Select
                value={color}
                onChange={handleColor}
            >
                {colors.map(e => {
                    return <MenuItem value={e.class}>
                        {e.class}
                    </MenuItem>

                })}
            </Select>
        </FormControl>

        <Typography variant="body1">Background</Typography>
        <FormControl size="small">
            <Select
                value={backgroundColor}
                onChange={handleBackgroundColor}
            >
                {backgroundColors.map(e => {
                    return <MenuItem value={e.class}>
                        {e.class}
                    </MenuItem>

                })}
            </Select>
        </FormControl>
        <Typography fullWidth sx={{
            color: 'white',
            borderRadius: '0.5rem',
            paddingLeft: '0.5rem',
            backgroundColor: "gray",
            marginY: '0.5rem'
        }} variant="h6">Border</Typography>
        <Typography variant="body1">Rounded</Typography>
        <FormControl size="small">
            <Select
                value={borderRadius}
                onChange={handleBorderRadiuses}
            >
                {borderRadiuses.map(e => {
                    return <MenuItem value={e.class}>
                        {e.class}
                    </MenuItem>

                })}
            </Select>
        </FormControl>
        <Typography variant="body1">Thickness</Typography>
        <FormControl size="small">
            <Select
                value={borderWidth}
                onChange={handleBorderWidth}
            >
                {borderWidths.map(e => {
                    return <MenuItem value={e.class}>
                        {e.class}
                    </MenuItem>

                })}
            </Select>
        </FormControl>

    </Stack>
}

export default TextNode;

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function BasicTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons aria-label="basic tabs example">
                    <Tab label="Item One" {...a11yProps(0)} />
                    <Tab label="Item Two" {...a11yProps(1)} />
                    <Tab label="Item Three" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                Item One
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                Item Two
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                Item Three
            </CustomTabPanel>
        </Box>
    );
}
