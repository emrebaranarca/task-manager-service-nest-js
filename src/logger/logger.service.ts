import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class LoggerService {
    constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) { }
    
    log(message: string) {
        this.logger.log('info',message)
    }

    /**
     * Write a 'fatal' level log.
     */
    fatal(message: any, ...optionalParams: any[]) {
        this.logger.error(message)
    }
  
    /**
     * Write an 'error' level log.
     */
    error(message: any, ...optionalParams: any[]) {
        this.logger.error(message)
    }
  
    /**
     * Write a 'warn' level log.
     */
    warn(message: any, ...optionalParams: any[]) {
        this.logger.warn(message)
    }
  
    /**
     * Write a 'debug' level log.
     */
    debug?(message: any, ...optionalParams: any[]) {
        this.logger.debug(message)
    }
  
    /**
     * Write a 'verbose' level log.
     */
    verbose?(message: any, ...optionalParams: any[]) {
        this.logger.verbose(message)
    }
}
