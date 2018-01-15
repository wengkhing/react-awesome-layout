import React from 'react'
import './style.css'

// === <Configurations> ===
// Default Block props
const defaultBlockProps = {
  layout: 'row',
  basis: 'auto',
  xBasis: 'auto',
  wrap: true,
  align: 'start start',
  gutter: '0px'
}

// Default child props
const defaultChildProps = {
  basis: 'auto',
  xBasis: 'auto',
  alignSelf: 'auto',
  order: 0
}
// =========================
const validBasisValue = /^[0-9]*(vw|px|vh|%)$/
const validGutterValue = /^[0-9]*px$/

const Block = (props) => {
  const { blockClassNames, blockStyle } = generateBlockClasses(props)
  return (
    <div className={blockClassNames}
      style={blockStyle}>
      {props.children.map((child, i) => {
        const { childClassNames, childStyle } = generateChildClasses(child.props, props.layout, props.gutter)
        return (
          <div key={i} className={childClassNames}
            style={childStyle}>
            {child}
          </div>
        )
      })}
    </div>
  )
}

function generateBlockClasses (props) {
  const blockProps = { ...defaultBlockProps, ...props }
  const style = {}
  let classNames = 'awe-block'
  // Validate 'layout' props and assign className accordingly
  switch (blockProps.layout) {
    case 'row':
    case 'column':
    case 'row-reverse':
    case 'column-reverse':
      classNames += ` ${blockProps.layout}`
      break
    default:
      console.warn(`'${blockProps.layout}' is not a valid value for property 'layout'.\nDefault value 'row' will be used instead.`)
      classNames += ' row'
  }

  // Validate 'wrap' props and assign className accordingly
  switch (blockProps.wrap) {
    case true:
    case 'down':
      classNames += ' down'
      break
    case 'up':
    case 'reverse':
      classNames += ' up'
      break
    case false:
    case 'none':
      break
    default:
      console.warn(`'${blockProps.layout}' is not a valid value for property 'wrap'.\nDefault value 'none' will be used instead.`)
  }

  // Validate 'align' props and assign className accordingly
  const alignArr = blockProps.align.split(' ')
  const baseAlign = alignArr[0] || 'start'
  const crossAlign = alignArr[1] || 'start'
  switch (baseAlign) {
    case 'start':
    case 'end':
    case 'center':
    case 'between':
    case 'around':
      classNames += ` base-${baseAlign}`
      break
    default:
      console.warn(`'${baseAlign}' is not a valid value for first argument of property 'align'.\nDefault value 'start' will be used instead.`)
      classNames += ' base-start'
  }

  switch (crossAlign) {
    case 'start':
    case 'end':
    case 'center':
    case 'baseline':
    case 'stretch':
      classNames += ` cross-${crossAlign}`
      break
    default:
      console.warn(`'${crossAlign}' is not a valid value for second argument of property 'align'.\nDefault value 'start' will be used instead.`)
      classNames += ' cross-start'
  }

  // Assign 'basis' and 'xBasis' value to style according to layout direction
  // assign 'basis' value to height and 'xBasis' value to width if layout direction is 'row' or 'row-reverse' or default
  // vice versa for layout 'column' or 'column-reverse'
  if (blockProps.basis) {
    switch (blockProps.layout) {
      // case 'row':
      // case 'row-reverse':
      //   style.width = blockProps.basis
      //   style.height = childProps.xBasis
      //   break
      case 'column':
      case 'column-reverse':
        style.height = blockProps.basis
        style.width = blockProps.xBasis
        break
      default:
        style.width = blockProps.basis
        style.height = blockProps.xBasis
    }
  }

  return { blockClassNames: classNames, blockStyle: style }
}

function generateChildClasses (props, parentLayout, gutter) {
  const childProps = { ...defaultChildProps, ...props }
  const style = {}
  let classNames = 'awe-child'
  // Validate 'alignSelf' props and assign className accordingly
  switch (childProps.alignSelf) {
    case 'start':
    case 'end':
    case 'center':
    case 'baseline':
    case 'stretch':
      classNames += ` self-${childProps.alignSelf}`
      break
    case 'auto':
      break
    default:
      console.warn(`'${childProps.alignSelf}' is not a valid value for property 'alignSelf'.\nDefault value 'auto' will be used instead.`)
  }

  // Validate 'basis' props and assign className and style accordingly
  switch (childProps.basis) {
    case 'fill':
      classNames += ' fill'
      break
    case 'auto':
      classNames += ' no-fill'
      break
    default:
      if (!validBasisValue.test(childProps.basis)) {
        console.warn(`'${childProps.basis}' is not a valid value for property 'basis'.\nPlease use numerical value postfix with 'px', 'vw', 'vh' or '%'. Example: '30%', '23vw', '100px'`)
      }
      style.flexBasis = childProps.basis
  }

  // Assign 'xBasis' value to style according to parent layout direction
  // assign value to height if parent layout direction is 'row' or 'row-reverse' or default
  // assign value to width if parent layout direction is 'column' or 'column-reverse'
  if (childProps.xBasis) {
    switch (parentLayout) {
      // case 'row':
      // case 'row-reverse':
      //   style.height = childProps.xBasis
      //   break
      case 'column':
      case 'column-reverse':
        style.width = childProps.xBasis
        break
      default:
        style.height = childProps.xBasis
    }
  }

  if (gutter && validGutterValue.test(gutter)) {
    style.margin = `${parseInt(gutter.replace('px', ''), 10) / 2}px`
  } else if (gutter) {
    console.warn(`'${gutter}' is not a valid value for property 'gutter'.\nPlease use numerical value postfix with 'px'. Example: 8px'`)
  }

  return { childClassNames: classNames, childStyle: style }
}

export default Block
