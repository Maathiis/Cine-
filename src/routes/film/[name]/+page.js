export function load(page) {
  
    console.log(page.params.name);
  return {
    title : page.params.name
    };
}