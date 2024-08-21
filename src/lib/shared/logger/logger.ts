/* eslint-disable @typescript-eslint/no-explicit-any */
import chalk, { type ChalkInstance } from 'chalk';
import * as fns from 'date-fns';

enum LogLevel {
	DEBUG = 0,
	INFO = 1,
	WARN = 2,
	ERROR = 3,
	FATAL = 4
}

class Logger {
	private readonly colors: Record<LogLevel, ChalkInstance> = {
		[LogLevel.DEBUG]: chalk.blue,
		[LogLevel.INFO]: chalk.green,
		[LogLevel.WARN]: chalk.yellow,
		[LogLevel.ERROR]: chalk.red,
		[LogLevel.FATAL]: chalk.bgRed
	};
	private readonly logLevel: LogLevel;

	constructor(private readonly name: string = 'DefaultLogger') {
		this.logLevel = LogLevel.DEBUG;
		console.log(this.logLevel);
	}

	debug(message: string, object?: Record<string, any>) {
		if (this.logLevel <= 0) {
			this.log(message, LogLevel.DEBUG, object);
		}
	}

	info(message: string, object?: Record<string, any>) {
		if (this.logLevel <= 1) {
			this.log(message, LogLevel.INFO, object);
		}
	}

	warn(message: string, object?: Record<string, any>) {
		if (this.logLevel <= 2) {
			this.log(message, LogLevel.WARN, object);
		}
	}

	error(message: string, object?: Record<string, any>) {
		if (this.logLevel <= 3) {
			this.log(message, LogLevel.ERROR, object);
		}
	}

	fatal(message: string, object?: Record<string, any>) {
		if (this.logLevel <= 4) {
			this.log(message, LogLevel.FATAL, object);
		}
	}

	private log(message: string, logLevel: LogLevel, object: Record<string, any> = {}) {
		return console.log(
			chalk.gray(this.getDate()),
			chalk.yellow(`[${this.name}] -`),
			this.colors[logLevel](`[${logLevel}] - ${message}`),
			object
		);
	}

	private getDate() {
		return fns.format(new Date(), 'HH:mm:ss.SSS');
	}
}
export const logger = new Logger();
