<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	export let data;
	let value = '';

	const controlFormElement = (formElement: HTMLFormElement) => {
		const div = formElement.firstElementChild as HTMLInputElement;
		const input = div.firstElementChild as HTMLInputElement;
		input.value = '';
		if (data.todos.length) input.focus();
	};
</script>

<svelte:head>
	<title>Not Todo List</title>
</svelte:head>

<h1>The not todo list</h1>

<form
	method="post"
	class="grid"
	use:enhance={() => {
		return async ({ formElement }) => {
			controlFormElement(formElement);
			invalidateAll();
		};
	}}
>
	<div>
		<input type="text" bind:value autocomplete="off" />
		<input hidden name="todos" value="{data.todos},{value}" />
	</div>
	<div>
		<button> Add </button>
	</div>
</form>

{#if data.todos.length}
	<table class="striped">
		<tbody>
			{#each data.todos as todo}
				<tr>
					<th scope="row">{todo}</th>
					<td>
						<form use:enhance method="post">
							<input
								hidden
								name="todos"
								value={data.todos.length > 1 ? data.todos.filter((e) => e !== todo) : 'null'}
							/>
							<button class="outline contrast">Delete</button>
						</form>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
