import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { formatStarknetWallet } from 'src/utils/commonFuntion/formatWalletAddress';
import { SOCKET_EVENTS } from 'src/utils/enum';
@WebSocketGateway({
  transports: ['websocket', 'polling'],
  cors: {
    origin: true,
    credentials: true,
  },
})
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(EventsGateway.name);
  @WebSocketServer() server: Server;
  afterInit(server: Server) {
    this.logger.log('Initialized');
    server.on('connect_error', (err) => {
      this.logger.error(`Connection error: ${err.message}`);
    });
  }

  handleConnection(client: any) {
    const { sockets } = this.server.sockets;

    this.logger.log(`Client id: ${client.id} connected`);
    this.logger.debug(`Number of connected clients: ${sockets.size}`);
  }

  handleDisconnect(client: any) {
    this.logger.log(`Cliend id:${client.id} disconnected`);
  }

  @SubscribeMessage(SOCKET_EVENTS.JOIN_ROOM)
  handleMessage(
    @MessageBody() address: string,
    @ConnectedSocket() socket: Socket,
  ) {
    socket.join(formatStarknetWallet(address));
    this.server
      .to(formatStarknetWallet(address))
      .emit('join-success', formatStarknetWallet(address));
    this.logger.log(`${address} joined`);
  }
}
