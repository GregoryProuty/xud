import { loadXudClient } from '../command';
import { Arguments } from 'yargs';
import { SubscribeAddedOrdersRequest, Order, SubscribeRemovedOrdersRequest, SubscribeSwapsRequest, Swap, OrderRemoval } from '../../proto/xudrpc_pb';

export const command = 'streamorders';

export const describe = 'stream order added, removed, and swapped events (DEMO)';

export const handler = (argv: Arguments) => {
  const addedOrdersSubscription = loadXudClient(argv).subscribeAddedOrders(new SubscribeAddedOrdersRequest());
  addedOrdersSubscription.on('data', (order: Order) => {
    console.log(`Order added: ${JSON.stringify(order.toObject())}`);
  });

  const removedOrdersSubscription = loadXudClient(argv).subscribeRemovedOrders(new SubscribeRemovedOrdersRequest());
  removedOrdersSubscription.on('data', (orderRemoval: OrderRemoval) => {
    console.log(`Order removed: ${JSON.stringify(orderRemoval.toObject())}`);
  });

  const swapsSubscription = loadXudClient(argv).subscribeSwaps(new SubscribeSwapsRequest());
  swapsSubscription.on('data', (swap: Swap) => {
    console.log(`Order swapped: ${JSON.stringify(swap.toObject())}`);
  });
};
