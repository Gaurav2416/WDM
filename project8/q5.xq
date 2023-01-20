<html>
<body>
{
for $x in distinct-values(doc("reed.xml")//course/instructor)
			return <instructor>
						<name> { $x } </name>
						<titles> 
							{ for $y in distinct-values(doc("reed.xml")//course[instructor = $x]/title)
							return <title>
										{ $y }
									</title>}
						</titles>
					</instructor>
}
</body>
</html>