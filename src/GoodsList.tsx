import classNames from 'classnames';
import React from 'react';

type Props = {
  goods: string[];
};

type State = {
  reverse: boolean;
  sortBy: SortType | undefined;
  lengthRange: number[];
  maxLength: number;
};

enum SortType{
  alphabet = 'alphabet',
  length = 'length',
  initial = '',
}

const wordsLengthRange: number[] = [];

for (let i = 1; i <= 10; i += 1) {
  wordsLengthRange.push(i);
}

export class GoodsList extends React.Component<Props, State> {
  state = {
    reverse: false,
    sortBy: SortType.initial,
    lengthRange: wordsLengthRange,
    maxLength: 10,
  };

  changeOrder = () => {
    this.setState(state => {
      return { reverse: !state.reverse };
    });
  };

  sortBy = (order: SortType) => {
    this.setState({ sortBy: order });
  };

  render() {
    const {
      reverse,
      sortBy,
      maxLength,
      lengthRange,
    } = this.state;

    const visibleGoods = [...this.props.goods].filter(item => item.length <= maxLength);

    visibleGoods.sort((item1, item2) => {
      switch (sortBy) {
        case 'alphabet':
          return item1.localeCompare(item2);

        case 'length':
          return item1.length - item2.length;

        default:
          return 0;
      }
    });

    if (reverse) {
      visibleGoods.reverse();
    }

    return (
      <div className="goods">
        <ul className="goods-list">
          {visibleGoods.map(item => {
            return (
              <li
                key="item"
                className="goods-list__item"
              >
                {item}
              </li>
            );
          })}
        </ul>

        <div className="goods__buttons">
          <h2 className="goods__subtitle">Order: </h2>
          <button
            type="button"
            onClick={this.changeOrder}
            className={classNames('goods__button', {
              'goods__button--reverse': reverse,
            })}
          >
            {reverse ? 'Reset' : 'Reverse'}
          </button>

          <h2 className="goods__subtitle">Sort by: </h2>
          <button
            type="button"
            className={classNames('goods__button', {
              'goods__button--active': sortBy === SortType.alphabet,
            })}
            onClick={() => {
              this.sortBy(SortType.alphabet);
            }}
          >
            Alphabet
          </button>

          <button
            type="button"
            className={classNames('goods__button', {
              'goods__button--active': sortBy === SortType.length,
            })}
            onClick={() => {
              this.sortBy(SortType.length);
            }}
          >
            Length
          </button>

          <h2 className="goods__subtitle">Words length: </h2>
          <select
            name="max-length"
            id="max-length"
            value={maxLength}
            onChange={(event) => this.setState({ maxLength: +event.target.value })}
            className="goods__length-input"
          >
            {lengthRange.map(number => (
              <option value={number}>
                {number}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}
