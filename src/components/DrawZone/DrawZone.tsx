import React from 'react';
import './DrawZone.css';
import { connect } from 'react-redux';
import Line from '../../classes/Line';
import Point from '../../classes/Point';
import { changeLineAction, removeLineAction } from '../../actions/lineActions';
import { setMousePosAction } from '../../actions/mouseActions';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import {ColorResult, TwitterPicker} from 'react-color';
import {addGroupAction, removeGroupAction} from "../../actions/groupActions";
import nanoid from "nanoid";
import Group from "../../classes/Group";

interface Props {
  lines: Line[];
  groups: Group[];
  changeLineAction: typeof changeLineAction,
  setMousePosAction: typeof setMousePosAction,
  removeLineAction: typeof removeLineAction,
  addGroupAction: typeof addGroupAction,
  removeGroupAction: typeof removeGroupAction,
}

const DrawZone = class extends React.Component<Props> {
  ctx: any;

  cWidth: number;

  cHeight: number;

  dragging: boolean;

  highlightedLine: Line | null;

  startPoint: Point | null;

  movingPoint: Point | null;

  isMovingPoint: boolean;

  selectedLines: Line[] | null;

  constructor(props: Props) {
    super(props);
    this.dragging = false;
    this.highlightedLine = null;
    this.ctx = null;
    this.startPoint = null;
    this.cWidth = 0;
    this.cHeight = 0;
    this.movingPoint = null;
    this.isMovingPoint = false;
    this.selectedLines = null;
  }

  componentDidMount() {
    const c: any = document.getElementById('stupidCanvas');
    // Make it visually fill the positioned parent
    c.style.width ='100%';
    c.style.height='100%';
    // ...then set the internal size to match
    c.width = c.offsetWidth;
    c.height = c.offsetHeight;
    this.ctx = c.getContext('2d');
    this.cWidth = c.width;
    this.cHeight = c.height;
    this.prepareField();
  }

  componentDidUpdate() {
    const { lines } = this.props;
    this.prepareField();
    lines.forEach((item: any) => {
      if (item instanceof Line) {
        if (item.highlighted) {
          this.highLightLine(item);
          this.highlightEnd(item.startPoint, item.color);
          this.highlightEnd(item.endPoint, item.color);
          this.highlightedLine = item;
          return;
        }
        if (this.checkIfSelected(item)) {
          this.showSelection(item);
        }
        this.unHighlightEnd(item.endPoint);
        this.unHighlightEnd(item.startPoint);
        this.unHighLightLine(item);
      }
    });
  };

  onMouseMoveHandler = (e: any) => {
    const userX = e.nativeEvent.offsetX;
    const userY = e.nativeEvent.offsetY;
    const { props } = this;
    const { lines } = props;
    const equation = this.highlightedLine ? this.highlightedLine.getEquation() : null;
    props.setMousePosAction(userX, userY, equation);
    if (!lines.length) return;

    if (this.dragging || this.isMovingPoint) {
      this.moveLine(e, true);
      return;
    }

    let flag = false;
    let highlightedGroup: Line[] = [];
    lines.forEach((item: any) => {
      if (item instanceof Line) {
        if (item.isOnLine(userX, userY)) {
          this.highLightLine(item);
          flag = true;
          const end = item.isOnEnd(userX, userY);
          if (end) {
            this.highlightEnd(end, item.color);
          }
          if (item.groupId) {
            highlightedGroup = this.selectGroup(item.groupId);
            highlightedGroup.forEach(itm => this.showSelection(itm));
          }
        } else {
          this.unHighlightEnd(item.endPoint);
          this.unHighlightEnd(item.startPoint);
          if (!highlightedGroup.some(h => h.id == item.id)) this.unHighLightLine(item);
        }
      }
    });
    if (!flag) this.highlightedLine = null;
  };

  highlightEnd = (pnt: Point, color: string) => {
    const { ctx } = this;
    const radius: number = 4;
    ctx.beginPath();
    ctx.arc(pnt.x, pnt.y, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.fill();
  };

  unHighlightEnd = (pnt: Point) => {
    const { ctx } = this;
    const radius: number = 6;
    ctx.beginPath();
    ctx.arc(pnt.x, pnt.y, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#FFFFFF';
    ctx.stroke();
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
  };

  highLightLine = (line: Line) => {
    const { ctx } = this;
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.moveTo(line.startPoint.x, line.startPoint.y);
    ctx.lineTo(line.endPoint.x, line.endPoint.y);
    ctx.strokeStyle = line.color;
    ctx.stroke();
    this.highlightedLine = line;
  };

  drawLine = (line: Line) => {
    const { ctx } = this;
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(line.startPoint.x, line.startPoint.y);
    ctx.lineTo(line.endPoint.x, line.endPoint.y);
    ctx.strokeStyle = line.color;
    ctx.stroke();
  };

  showSelection = (line: Line) => {
    const { ctx } = this;
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.moveTo(line.startPoint.x, line.startPoint.y);
    ctx.lineTo(line.endPoint.x, line.endPoint.y);
    ctx.strokeStyle = "#6593F5";
    ctx.stroke();
    this.drawLine(line);
  };

  removeLine = (line: Line) => {
    const { ctx } = this;
    ctx.beginPath();
    ctx.lineWidth = 6;
    ctx.moveTo(line.startPoint.x, line.startPoint.y);
    ctx.lineTo(line.endPoint.x, line.endPoint.y);
    // eslint-disable-next-line no-bitwise
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();
  };

  unHighLightLine = (line: Line) => {
    this.removeLine(line);
    this.drawLine(line);
    if (this.checkIfSelected(line)) {
      this.showSelection(line);
    }
  };

  controlSelection = (line: Line): boolean => {
    if (this.selectedLines == null) {
      this.selectedLines = [line];
      return true;
    }
    if (this.selectedLines.some(sel => sel.id === line.id)) {
      this.selectedLines = this.selectedLines.filter(sl => sl.id !== line.id);
      return false;
    }
    this.selectedLines.push(line);
    return true;
  };

  checkIfSelected = (line: Line): boolean => {
    return (!!this.selectedLines) && this.selectedLines.some(sl => sl.id === line.id);
  };

  selectGroup = (groupId: string): Line[] => {
    const { lines } = this.props;
    return lines.filter(line => line.groupId === groupId);
}

  startDrag = (e: any) => {
    if (e.nativeEvent.which === 3) return;
    if (!this.highlightedLine) return;

    if (e.ctrlKey) {
      const added = this.controlSelection(this.highlightedLine);
      if (added) {
        this.showSelection(this.highlightedLine);
      } else {
        this.unHighLightLine(this.highlightedLine);
      }
      return;
    }
    const startX = e.nativeEvent.offsetX;
    const startY = e.nativeEvent.offsetY;
    const movingPoint = this.highlightedLine.isOnEnd(startX, startY);

    if (movingPoint) {
      this.movingPoint = movingPoint;
      this.isMovingPoint = true;
      return;
    }

    if (this.highlightedLine.isOnLine(startX, startY)) {
      this.startPoint = new Point(startX, startY, 0);
      this.dragging = true;
      return;
    }

    this.highlightedLine = null;
    this.startPoint = null;
    this.isMovingPoint = false;
    this.movingPoint = null;
  }

  moveLine = (e: any, moveWhileDragging: Boolean) => {
    if (!this.highlightedLine) return;

    const { props } = this;
    const endX = e.nativeEvent.offsetX;
    const endY = e.nativeEvent.offsetY;
    const newLine: Line = this.highlightedLine.clone();

    if (this.isMovingPoint && this.movingPoint) {
      const dX = endX - this.movingPoint.x;
      const dY = endY - this.movingPoint.y;
      if (newLine.startPoint === this.movingPoint) {
        newLine.startPoint.x += dX;
        newLine.startPoint.y += dY;
      }
      if (newLine.endPoint === this.movingPoint) {
        newLine.endPoint.x += dX;
        newLine.endPoint.y += dY;
      }
    }

    if (this.dragging && newLine && this.startPoint) {
      const dX = endX - this.startPoint.x;
      const dY = endY - this.startPoint.y;
      newLine.startPoint.x += dX;
      newLine.startPoint.y += dY;
      newLine.endPoint.x += dX;
      newLine.endPoint.y += dY;
    }

    if (this.highlightedLine && (this.dragging || this.isMovingPoint)) {
      props.changeLineAction(this.highlightedLine.id, newLine);
      this.highlightedLine = newLine;
      this.startPoint = new Point(endX, endY, 0);
    }
    if (moveWhileDragging) return;

    this.startPoint = null;
    this.dragging = false;
    this.movingPoint = null;
    this.isMovingPoint = false;
  }

  endDrag = (e: any) => {
    if (!this.highlightedLine && !this.isMovingPoint) return;
    this.moveLine(e, false);
  }

  deleteLine = (e: any) => {
    const { props } = this;
    if (this.highlightedLine) {
      props.removeLineAction(this.highlightedLine.id);
      this.highlightedLine = null;
    }
  };

  createGroup = (e: any) => {
    console.log(this.selectedLines);
    const { props } = this;
    if (!this.selectedLines) return;
    if (this.selectedLines.length <= 1) return;
    const gId = nanoid();
    props.addGroupAction(new Group(gId, ''));
    this.selectedLines.forEach(sl => {
      sl.groupId = gId;
      this.unHighLightLine(sl);
      console.log(sl);
      props.changeLineAction(sl.id, sl);
    });
    this.selectedLines = null;
  };

  changeLineColor = (color: ColorResult) => {
    const { props } = this;
    if (this.highlightedLine) {
      const newLine = this.highlightedLine.clone();
      newLine.color = color.hex;
      props.changeLineAction(this.highlightedLine.id, newLine);
    }
  };

  prepareField = () => {
    const { cWidth, cHeight } = this;
    const { ctx } = this;
    ctx.clearRect(0, 0, cWidth, cHeight);
    ctx.fillStyle = '#778899';
    const rect = 50;
    for (let x = 5; x < cWidth; x += rect) {
      for (let y = 5; y < cHeight; y += rect) {
        ctx.fillRect(x, y,1,1);
      }
    }
  }

  render() {
    return (
      <div className="drawZone">
        <ContextMenuTrigger id="drawZoneCtxMenu" holdToDisplay={-1}>
        <canvas
          id="stupidCanvas"
          className="stupidCanvas"
          onMouseMove={this.onMouseMoveHandler}
          onMouseDown={this.startDrag}
          onMouseUp={this.endDrag}
        />
        </ContextMenuTrigger>
        <ContextMenu id="drawZoneCtxMenu">
          <MenuItem className='menuItem'>
            <TwitterPicker
              color={this.highlightedLine ? this.highlightedLine.color : "fefefe"}
              onChange={this.changeLineColor}
              triangle={"hide"}
            />
          </MenuItem>
          <MenuItem onClick={this.deleteLine} className='menuItem'>
            Delete Line
          </MenuItem>
          <MenuItem onClick={this.createGroup} className='menuItem'>
            Create Group
          </MenuItem>
        </ContextMenu>
      </div>
    );
  }
};

const mapStateToProps = (state: any) => {
  const lines = state.linesState;
  const groups = state.groupsState;
  return { lines, groups };
};

// @ts-ignore
DrawZone.displayName = 'DrawZone';
export default connect(
  mapStateToProps,
  {
    changeLineAction,
    setMousePosAction,
    removeLineAction,
    addGroupAction,
    removeGroupAction,
  },
)(DrawZone);
