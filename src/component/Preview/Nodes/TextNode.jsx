import { Box } from "@mui/material";
const TextNode = ({ node }) => {

    const customStyle = () => {

        const style = node?.data?.style;
        let newStyle = {}
        if (!style)
            return {};

        Object.keys(style).forEach(k => {
            newStyle = { ...newStyle, ...style[k].properties }
        })
        return newStyle
    }

    // const fontSize = style && style["font-size"] ? style["font-size"].properties?.fontSize : '1rem';
    // const lineHeight = style && style["font-size"] ? style["font-size"].properties?.lineHeight : "1.5rem";
    // const fontWeight = style && style["font-weight"] ? style["font-weight"].properties?.fontWeight : '400';
    // const fontStyle = style && style["font-style"] ? style["font-style"].properties?.fontStyle : 'normal';
    //    console.log('preview', {
    //     fontSize,
    //     lineHeight,
    //     fontWeight,
    //     fontStyle
    //    })
    return <Box
        sx={{
            border: "1px solid grey",
            borderRadius: "2px",
            padding: "2px",
            fontSize: '1rem',
            lineHeight: '1.5rem',
            fontWeight: '400',
            overflow:'hidden',
            // whiteSpace:'',
            textOverflow: 'ellipsis',
            textWrap: 'wrap',

            fontStyle: 'normal',
            
            ...customStyle()
        }}
    >
        {node.data?.text}
    </Box>
}

export default TextNode; 