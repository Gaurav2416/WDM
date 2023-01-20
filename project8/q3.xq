<html>
<body>
{
for $x in distinct-values(doc("reed.xml")//course/subj)
			return <department>
            <code>{$x}</code>
				<count> { count(distinct-values(doc("reed.xml")//course[subj = $x])) } </count>
            </department>
}
</body>
</html>