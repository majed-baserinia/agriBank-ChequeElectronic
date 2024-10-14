/**
 * The resolver.
 * Implement this interface and call mediatrSettings.resolver at startup
 * for changing the container and resolution of instances
 *
 * @export
 * @interface IResolver
 */
export default interface IResolver {
	/**
	 * Retrieve a func from the container
	 *
	 * @template T
	 * @param {string} name The instance name to retrieve
	 * @returns {T}
	 * @memberof IResolver
	 */
	resolve<T>(name: string): T;

	/**
	 * Retrieve a func from the container
	 *
	 * @template T
	 * @param {string} name The instance name to retrieve
	 * @returns {T[]}
	 * @memberof IResolver
	 */
	resolveMany<T>(name: string): T[];

	/**
	 * Add a func and name to the container
	 *
	 * @param {string} name The instance name to add to the container
	 * @param {Function} instance The function to store with the instance name
	 * @memberof IResolver
	 */
	// eslint-disable-next-line @typescript-eslint/ban-types
	add(name: string, instance: Function): void;

	/**
	 * Remove an isntance from the container
	 *
	 * @param {string} name The instance name to remove from the container
	 * @memberof IResolver
	 */
	remove(name: string): void;

	/**
	 * Clear the container
	 *
	 * @memberof IResolver
	 */
	clear(): void;
}
